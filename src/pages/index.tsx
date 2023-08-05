import { chains, listedChains, listedWallets } from "@/constants/graz";
import {
  Button,
  Center,
  HStack,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  VStack,
  keyframes,
  useDisclosure,
} from "@chakra-ui/react";
import {
  WalletType,
  truncate,
  useAccount,
  useChainBalances,
  useConnect,
  useDisconnect,
} from "graz";

export default function Home() {
  const modal = useDisclosure();

  const { connect, isLoading: isConnecting } = useConnect();
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
          <Stack spacing={1}>
            <Heading textAlign="center">Quicksilver stake</Heading>
            <Text fontWeight="semibold" textAlign="center">
              The Cosmos Liquid Staking Zone
            </Text>
          </Stack>
          <Stack>
            {!accounts ? (
              <HStack>
                {listedChains.map((chain) => (
                  <VStack
                    key={chain.name}
                    flex={1}
                    bgColor="whiteAlpha.100"
                    _hover={{
                      bgColor: "whiteAlpha.200",
                    }}
                    py={4}
                    borderRadius={12}
                  >
                    <Image
                      boxSize="100px"
                      src={chain.imgSrc}
                      alt={chain.name}
                    />
                    <Text fontWeight="bold">{chain.name}</Text>
                  </VStack>
                ))}
              </HStack>
            ) : null}

            {accounts ? (
              <Stack>
                {listedChains.map((chain) => (
                  <Stack
                    key={chain.name}
                    bgColor="whiteAlpha.100"
                    _hover={{
                      bgColor: "whiteAlpha.200",
                    }}
                    py={4}
                    px={4}
                    borderRadius={12}
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
                    <HStack justifyContent="space-between">
                      <Stack>
                        {balances.data?.[chain.chainId]?.map((balance) => (
                          <HStack key={balance.denom}>
                            <Text fontWeight="bold" fontFamily="mono">
                              {Number(
                                Number(balance.amount) /
                                  Math.pow(
                                    10,
                                    chains.find(
                                      (item) => item.chainId === chain.chainId
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
                        <HStack>
                          <Text fontWeight="bold" fontFamily="mono">
                            {Number(
                              Number(
                                balances.data?.["quicksilver-2"].find(
                                  (item) => item.denom === chain.stakeDenom
                                )?.amount
                              ) /
                                Math.pow(
                                  10,
                                  chains
                                    .find(
                                      (item) => item.chainId === "quicksilver-2"
                                    )
                                    ?.currencies.find(
                                      (item) =>
                                        item.coinMinimalDenom ===
                                        chain.stakeDenom
                                    )?.coinDecimals || 6
                                )
                            ).toFixed(6)}
                          </Text>
                          <Text fontWeight="semibold" fontFamily="mono">
                            {
                              chains
                                .find(
                                  (item) => item.chainId === "quicksilver-2"
                                )
                                ?.currencies.find(
                                  (item) =>
                                    item.coinMinimalDenom === chain.stakeDenom
                                )?.coinDenom
                            }
                          </Text>
                        </HStack>
                      </Stack>
                      <Button bgColor="brand" alignSelf="end">
                        Stake
                      </Button>
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
                      connect({
                        walletType: key as WalletType,
                        chainId: chains.map((item) => item.chainId),
                      });
                      modal.onClose();
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
