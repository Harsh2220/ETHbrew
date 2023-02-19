import {
  chakra,
  Flex,
  HStack,
  Text,
  Link,
  Button,
  Box,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Router, useRouter } from "next/router";
import { useAccount, useConnect } from "wagmi";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";

export const NavBar = () => {
  const router = useRouter();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { connector, address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { pathname } = useRouter();

  const toast = useToast();
  const walletError = useEffect(() => {
    if (!error) return;
    toast({
      title: "Wallet Error",
      description: error?.message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }, [error]);
  return (
    <React.Fragment>
      <chakra.header bg={"transparent"} w="full" px={{ base: 4, sm: 6 }} py={4}>
        <Flex alignItems="center" justifyContent="space-between"  mx="auto">
          <Flex></Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <Button
              bg={"transparent"}
              pr={4}
              pl={4}
              fontWeight={"bold"}
              onClick={() => {
                router.push("/");
              }}
            >
              Home{" "}
            </Button>
            <Button
              bg={"transparent"}
              pr={4}
              pl={4}
              fontWeight={"bold"}
              onClick={() => {
                router.push("/create");
              }}
            >
              Create{" "}
            </Button>
            <Button
              bg={"transparent"}
              pr={4}
              pl={4}
              fontWeight={"bold"}
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Dashboard{" "}
            </Button>
            <Button
              bg={"transparent"}
              pr={4}
              pl={4}
              fontWeight={"bold"}
              onClick={() => {
                router.push("/mintdomain");
              }}
            >
              Mint Domain
            </Button>
            <Box ml={4}>
            </Box>
            <div className="main">
                {isConnected && (
                  <div
                    className="connected-msg text-white hover:text-[#E3FED8] bg-[#35B226] py-2 px-5 rounded-lg"
                    color="light"
                  >
                    {address}
                  </div>
                )}
                {!isConnected &&
                  connectors.map((connector) => (
                    <button
                      className="connect-btn text-white bg-[#35B226] py-2 px-5 rounded-lg hover:text-[#E3FED8]"
                      disabled={!connector.ready}
                      key={connector.id}
                      onClick={() => connect({ connector })}
                    >
                      Connect {connector.name}
                      {isLoading &&
                        pendingConnector?.id === connector.id &&
                        " (connecting)"}
                    </button>
                  ))}
                {/* {error && <div className="text-[#E3FED8]">{error.message}</div>} */}
              </div>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
