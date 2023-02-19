import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Heading,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HistoryCard from "../components/HistoryCard";
import abi from "../utils/contractABI.json";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { NavBar } from "../components/NavBar";

interface historyDetails {
  from: string;
  txn: string;
  matic: string;
  message: string;
  timestamp: number;
}

export default function History() {
  const [history, setHistory] = useState<historyDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { address, isConnected } = useAccount();

  const contractAbi = abi.abi;

  const getHistory = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0x957241D8B3d9cCDb47099fe859cB3722327d2278",
          contractAbi,
          signer
        );

        const history = await contract.getTransactions(address);
        setHistory(history as historyDetails[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      getHistory();
    }
  }, [isConnected]);

  return (
    <Box
      bgGradient="radial-gradient(circle at 20% 20%, #7B3FE4, rgba(76, 0, 255, 0), rgba(76, 0, 255, 0), rgba(76, 0, 255, 0))"
      opacity={1}
      className="blurBg"
    >
      <NavBar />
      <Center h="100vh">
        <Container
          maxW={"container.md"}
          bg="#fefefe60"
          textAlign={"center"}
          p={10}
          rounded="xl"
        >
          {isConnected ? (
            <Card>
              <CardHeader>
                <Heading size="md">Transactions</Heading>
              </CardHeader>
              <CardBody>
                {history.length > 0 && isConnected && (
                  <HistoryCard history={history} />
                )}
              </CardBody>
            </Card>
          ) : (
            <Heading>Please Connect your wallet</Heading>
          )}
        </Container>
      </Center>
    </Box>
  );
}
