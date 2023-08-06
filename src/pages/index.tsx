import { chains, listedChains, listedWallets } from "@/constants/graz";
import {
  Box,
  Button,
  Center,
  Code,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Spinner,
  Stack,
  Text,
  VStack,
  keyframes,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { fromBech32, toBech32 } from "@cosmjs/encoding";
import {
  WalletType,
  getChain,
  truncate,
  useAccount,
  useBalance,
  useChainBalances,
  useConnect,
  useConnectSigningClient,
  useDisconnect,
  useSendTokens,
  useSuggestChain,
} from "graz";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";

export default function Home() {
  const toast = useToast();
  const modal = useDisclosure();

  const { connectAsync, isLoading: isConnecting } = useConnect({
    onSuccess: () => {
      toast({
        title: "Connected",
        description: "You are now connected to Quicksilver",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Connection error",
        // @ts-ignore
        description: error?.message ?? "Unknown error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  const suggest = useSuggestChain();

  const handleSuggestAndConnect = async (walletType: WalletType) => {
    await Promise.all(
      chains.map(async (chain) => {
        await suggest.suggestAsync({
          chainInfo: chain,
          walletType,
        });
      })
    );
    await connectAsync({
      walletType: walletType,
      chainId: chains.map((item) => item.chainId),
    });
  };

  const connectAndSuggestMutation = useMutation(handleSuggestAndConnect, {
    onSettled: modal.onClose,
  });
  const quicksilverChain = chains[0].chainId;
  const accounts = useAccount();
  const disconnect = useDisconnect();
  const balances = useChainBalances({
    chainId: chains.map((item) => item.chainId),
    bech32Address: accounts?.[chains[0].chainId]?.account?.bech32Address,
  });

  const glowAnimation = keyframes`100% {
    box-shadow: 0 0 3px #f9ede6, 0 0 10px #f9ede6, 0 0 20px #f9ede6, 0 0 40px #be4900,
      0 0 70px #be4900, 0 0 80px #be4900;
  }`;

  return (
    <>
      <Center h="100vh">
        <Stack
          w="container.sm"
          bgColor="whiteAlpha.100"
          p={8}
          px={6}
          borderRadius={12}
          spacing={4}
          minH="200px"
          sx={{
            boxShadow: `0 0 2px #f9ede6, 0 0 10px #f9ede6, 0 0 20px #be4900, 0 0 30px #be4900,
    0 0 40px #be4900, 0 0 50px #be4900`,
            animation: `${glowAnimation} 3s infinite linear alternate`,
          }}
        >
          <HStack justifyContent="space-between">
            <Stack spacing={1}>
              <Heading>Quicksilver stake</Heading>
              <Text fontWeight="semibold">The Cosmos Liquid Staking Zone</Text>
            </Stack>
            {accounts ? (
              <Stack alignItems="flex-end" spacing={1}>
                <Text
                  fontSize="sm"
                  fontFamily="mono"
                  bgColor="blackAlpha.500"
                  p={1}
                  px={2}
                  borderRadius={8}
                >
                  {truncate(accounts[quicksilverChain]?.account?.bech32Address)}
                </Text>
                {balances.data?.[quicksilverChain]
                  ?.filter((item) => item.denom === "uqck")
                  .map((balance) => (
                    <HStack key={balance.denom}>
                      <Text fontWeight="bold" fontFamily="mono">
                        {Number(
                          Number(balance.amount) /
                            Math.pow(
                              10,
                              chains.find(
                                (item) => item.chainId === quicksilverChain
                              )?.currencies[0].coinDecimals || 6
                            )
                        ).toFixed(6)}
                      </Text>
                      <Text fontWeight="semibold" fontFamily="mono">
                        {
                          chains.find(
                            (item) => item.chainId === quicksilverChain
                          )?.currencies[0].coinDenom
                        }
                      </Text>
                    </HStack>
                  ))}
              </Stack>
            ) : null}
          </HStack>
          <Stack>
            {!accounts ? (
              <Stack>
                {listedChains.map((chain) => {
                  const chainInfo = chains.find(
                    (item) => item.chainId === chain.chainId
                  );
                  return (
                    <Stack
                      key={chain.name}
                      flex={1}
                      bgColor="whiteAlpha.100"
                      _hover={{
                        bgColor: "whiteAlpha.200",
                      }}
                      py={4}
                      borderRadius={12}
                      px={4}
                    >
                      <HStack justifyContent="space-between">
                        <Text fontWeight="bold">{chain.name}</Text>
                        <Image
                          boxSize="24px"
                          src={chain.imgSrc}
                          alt={chain.name}
                        />
                      </HStack>
                      <Stack fontSize="sm" fontFamily="monospace" wrap="wrap">
                        <Text>Chain Name: {chainInfo?.chainName}</Text>
                        <Text>Chain ID: {chainInfo?.chainId}</Text>
                        <Text>Rest: {chainInfo?.rest}</Text>
                        <Text>RPC: {chainInfo?.rpc}</Text>

                        {chainInfo?.feeCurrencies.map((item) => (
                          <Box key={item.coinDenom}>
                            <HStack
                              justifyContent="space-between"
                              bgColor="blackAlpha.500"
                              align="start"
                              p={2}
                              borderRadius={8}
                            >
                              <Stack>
                                <Text>
                                  Coin Minimal Denom: {item.coinMinimalDenom}
                                </Text>
                                <Text>Denom: {item.coinDenom}</Text>
                                <Text>Decimal: {item.coinDecimals}</Text>
                              </Stack>
                              <Stack textAlign="right">
                                <Text>Gas Price Step: </Text>
                                {Object.entries(item.gasPriceStep).map(
                                  (item) => (
                                    <Text key={item[0]}>
                                      {item[0]}: {item[1]}
                                    </Text>
                                  )
                                )}
                              </Stack>
                            </HStack>
                          </Box>
                        ))}
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            ) : null}

            {accounts ? (
              <Stack>
                {listedChains
                  .filter((item) => item.chainId !== quicksilverChain)
                  .map((chain) => (
                    <Stack
                      key={chain.name}
                      bgColor="whiteAlpha.100"
                      _hover={{
                        bgColor: "whiteAlpha.200",
                      }}
                      py={4}
                      px={4}
                      borderRadius={12}
                      spacing={4}
                    >
                      <HStack justifyContent="space-between">
                        <HStack>
                          <Image
                            boxSize="32px"
                            src={chain.imgSrc}
                            alt={chain.name}
                          />
                          <Text fontWeight="bold">{chain.name}</Text>
                          {balances.isLoading && <Spinner size="sm" />}
                        </HStack>
                        <Text
                          fontSize="sm"
                          fontFamily="mono"
                          bgColor="blackAlpha.500"
                          p={1}
                          px={2}
                          borderRadius={8}
                        >
                          {truncate(
                            accounts[chain.chainId]?.account?.bech32Address,
                            8
                          )}
                        </Text>
                      </HStack>
                      <HStack justifyContent="space-between" alignItems="end">
                        <Stack>
                          <Skeleton
                            startColor="whiteAlpha.200"
                            endColor="whiteAlpha.500"
                            isLoaded={!balances.isLoading}
                          >
                            {balances.data?.[chain.chainId]?.map((balance) => (
                              <HStack key={balance.denom}>
                                <Text fontWeight="bold" fontFamily="mono">
                                  {Number(
                                    Number(balance.amount) /
                                      Math.pow(
                                        10,
                                        chains.find(
                                          (item) =>
                                            item.chainId === chain.chainId
                                        )?.currencies[0].coinDecimals || 6
                                      )
                                  ).toFixed(6)}
                                </Text>
                                <Text fontWeight="semibold" fontFamily="mono">
                                  {
                                    chains.find(
                                      (item) => item.chainId === chain.chainId
                                    )?.currencies[0].coinDenom
                                  }
                                </Text>
                              </HStack>
                            ))}
                          </Skeleton>
                        </Stack>
                        <StakeButton chainId={chain.chainId} />
                      </HStack>
                    </Stack>
                  ))}
              </Stack>
            ) : null}
          </Stack>

          <Stack w="full">
            {accounts ? (
              <Button
                fontWeight="bold"
                onClick={() => disconnect.disconnect()}
                isLoading={disconnect.isLoading}
              >
                Disconnect
              </Button>
            ) : (
              <>
                <Button
                  bgColor="brand"
                  fontWeight="bold"
                  onClick={modal.onOpen}
                  isLoading={isConnecting}
                >
                  Connect
                </Button>
                <Text
                  color="whiteAlpha.500"
                  fontWeight="semibold"
                  textAlign="center"
                  fontSize="sm"
                >
                  Connect your wallet to start
                </Text>
              </>
            )}
          </Stack>
        </Stack>
      </Center>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} isCentered>
        <ModalOverlay bgColor="blackAlpha.800" />
        <ModalContent bgColor="baseBg" borderRadius="2xl" py={4}>
          <ModalBody>
            <Stack spacing={4}>
              <Heading fontWeight="semibold" textAlign="center" fontSize="28px">
                Choose wallet
              </Heading>
              <HStack>
                {Object.entries(listedWallets).map(([key, wallet]) => (
                  <VStack
                    key={wallet.name}
                    flex={1}
                    bgColor="whiteAlpha.200"
                    _hover={{
                      bgColor: "whiteAlpha.400",
                    }}
                    py={4}
                    borderRadius={12}
                    as="button"
                    onClick={() => {
                      connectAndSuggestMutation.mutate(key as WalletType);
                    }}
                  >
                    <Image
                      boxSize="100px"
                      src={wallet.imgSrc}
                      alt={wallet.name}
                    />
                    <Text fontWeight="bold">{wallet.name}</Text>
                  </VStack>
                ))}
              </HStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const StakeButton = ({ chainId }: { chainId: string }) => {
  const toast = useToast();
  const router = useRouter();
  const chain = chains.find((item) => item.chainId === chainId);
  const coin = chain?.stakeCurrency;
  const account = useAccount({
    chainId: chainId,
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const balance = useBalance({
    chainId: chainId,
    bech32Address: account?.account?.bech32Address,
    searchDenom: coin?.coinMinimalDenom,
  });

  const { data: signingClient, isLoading: isSCLoading } =
    useConnectSigningClient({
      chainId: chainId,
      client: "stargate",
    });

  const { isLoading, sendTokensAsync } = useSendTokens({
    chainId: chainId,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Transaction done",
        status: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        // @ts-ignore
        description: error?.message || "Something went wrong",
        status: "error",
      });
    },
  });
  const depositAddress =
    "cosmos1pl2ld9d0x9ve6flklr9jv9sl69y6yucvaelcljml83l7kyn0m0ksacp9tj";

  const [amount, setAmount] = useState("");
  const [result, setResult] =
    useState<Awaited<ReturnType<typeof sendTokensAsync>>>();

  const handleOnClose = () => {
    setAmount("");
    setResult(undefined);
    onClose();
  };

  const handleStake = async () => {
    try {
      if (!signingClient) {
        toast({
          title: "Error",
          description: "Signing Client not found",
          status: "error",
        });
        return;
      }
      const res = await sendTokensAsync({
        amount: [
          {
            amount: String(
              Number(amount) * Math.pow(10, coin?.coinDecimals || 6)
            ),
            denom: coin?.coinMinimalDenom || "",
          },
        ],
        fee: {
          amount: [
            {
              amount: "5000",
              denom: coin?.coinMinimalDenom || "",
            },
          ],
          gas: "200000",
        },
        memo: "",
        senderAddress: account?.account?.bech32Address || "",
        recipientAddress: depositAddress,
        signingClient: signingClient,
      });
      setResult(res);
    } catch (error) {
      console.error(error);
      handleOnClose();
    }
  };

  return (
    <>
      <Button bgColor="brand" alignSelf="end" px={4} onClick={onOpen}>
        Stake
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleOnClose}
        isCentered
        closeOnEsc={!isLoading}
        closeOnOverlayClick={!isLoading}
      >
        <ModalOverlay bgColor="blackAlpha.800" />
        <ModalContent bgColor="baseBg" borderRadius="2xl" py={4}>
          <ModalBody>
            <Stack spacing={4}>
              <Heading fontWeight="semibold" fontSize="28px">
                Stake
              </Heading>
              {result ? (
                <Stack spacing={3}>
                  <Stack spacing={1}>
                    <Text color="whiteAlpha.600" fontWeight="semibold">
                      TxHash:
                    </Text>
                    <Text
                      fontFamily="mono"
                      wordBreak="break-all"
                      fontWeight="bold"
                    >
                      {result.transactionHash}
                    </Text>
                  </Stack>
                  <Stack spacing={1}>
                    <Text color="whiteAlpha.600" fontWeight="semibold">
                      TxHeight:
                    </Text>
                    <Text
                      fontFamily="mono"
                      wordBreak="break-all"
                      fontWeight="bold"
                    >
                      {result.height}
                    </Text>
                  </Stack>
                  <Stack spacing={1}>
                    <Text color="whiteAlpha.600" fontWeight="semibold">
                      Gas Used:
                    </Text>
                    <Text
                      fontFamily="mono"
                      wordBreak="break-all"
                      fontWeight="bold"
                    >
                      {result.gasUsed}
                    </Text>
                  </Stack>
                  <HStack>
                    <Button
                      variant="outline"
                      alignSelf="end"
                      px={4}
                      onClick={() => {
                        handleOnClose();
                      }}
                      flex="1"
                    >
                      Close
                    </Button>
                    <Button
                      bgColor="brand"
                      alignSelf="end"
                      px={4}
                      onClick={() => {
                        window.open(
                          `https://explorer.theta-testnet.polypore.xyz/transactions/${result.transactionHash}`,
                          "_blank"
                        );
                      }}
                      flex="1"
                    >
                      Open in Block Explorer
                    </Button>
                  </HStack>
                </Stack>
              ) : (
                <>
                  <Stack>
                    <Stack pb={4}>
                      <Text>Your Deposit Address</Text>
                      <Text
                        fontSize="sm"
                        fontFamily="mono"
                        bgColor="blackAlpha.500"
                        p={1}
                        px={2}
                        borderRadius={8}
                      >
                        {toBech32(
                          chain?.bech32Config.bech32PrefixAccAddr || "",
                          fromBech32(depositAddress).data
                        )}
                      </Text>
                    </Stack>
                    <HStack justifyContent="space-between">
                      <Text fontWeight="semibold">Amount</Text>
                      <HStack color="whiteAlpha.600">
                        {balance.isLoading ? (
                          <Spinner size="sm" />
                        ) : (
                          <>
                            <Text>Available: </Text>
                            <Text fontFamily="mono">
                              {Number(
                                Number(balance.data?.amount || 0) /
                                  Math.pow(10, coin?.coinDecimals || 6)
                              )}{" "}
                              {coin?.coinDenom}
                            </Text>
                          </>
                        )}
                      </HStack>
                    </HStack>
                    <InputGroup size="sm">
                      <Input
                        placeholder="0"
                        type="number"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                      />
                      <InputRightAddon>ATOM</InputRightAddon>
                    </InputGroup>
                  </Stack>

                  <Button
                    bgColor="brand"
                    onClick={handleStake}
                    isLoading={isLoading || isSCLoading}
                  >
                    Stake
                  </Button>
                </>
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
