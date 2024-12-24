import {
  ConnectButton,
  Connector,
  useAccount,
  NFTCard,
} from "@ant-design/web3";
import {
  Mainnet,
  Sepolia,
  MetaMask,
  OkxWallet,
  TokenPocket,
  WagmiWeb3ConfigProvider,
} from "@ant-design/web3-wagmi";
import { QueryClient } from "@tanstack/react-query";
import { http, useWriteContract } from "wagmi";
import { Button, message } from "antd";

const queryClient = new QueryClient();

const CallTest = () => {
  const { writeContract } = useWriteContract();
  const { account } = useAccount();

  return (
    <Button
      onClick={() => {
        writeContract(
          {
            abi: [
              {
                type: "function",
                name: "awardItem",
                inputs: [
                  { internalType: "address", name: "player", type: "address" },
                  { internalType: "string", name: "tokenURI", type: "string" },
                ],
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" },
                ],
              },
            ],
            address: "0x46371b97f1f67b4851f3103a131dc3f690cbf7cd",
            functionName: "awardItem",
            args: [
              account?.address,
              "https://api.our-metaverse.xyz/api/meta/42",
            ],
          },
          {
            onError: (err) => {
              message.error(err.message);
            },
          }
        );
      }}
    >
      mint
    </Button>
  );
};

const App: React.FC = () => {
  return (
    <WagmiWeb3ConfigProvider
      eip6963={{
        autoAddInjectedWallets: true,
      }}
      ens
      chains={[Mainnet, Sepolia]}
      balance
      transports={{
        [Mainnet.id]: http(),
        [Sepolia.id]: http(),
      }}
      wallets={[
        MetaMask(),
        TokenPocket({
          group: "Popular",
        }),
        OkxWallet(),
      ]}
      queryClient={queryClient}
    >
      <Connector
        modalProps={{
          mode: "simple",
        }}
      >
        <ConnectButton quickConnect />
      </Connector>
      <CallTest />
      <NFTCard
        address="0x46371b97f1f67b4851f3103a131dc3f690cbf7cd"
        tokenId={1}
      />
    </WagmiWeb3ConfigProvider>
  );
};

export default App;
