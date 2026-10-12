import {
  createWalletClient,
  custom,
  createPublicClient,
  parseEther,
  defineChain,
} from "https://esm.sh/viem";
import { contractAddress, abi } from "./constants";

const connectButton = document.getElementById("connectButton");
const buyCoffee = document.getElementById("buyCoffee");
const ethAmount = document.getElementById("ethAmount");

let walletClient;
let publicClient;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
    await walletClient.requestAddresses();
    connectButton.innerHTML = "Connected";
  } else {
    connectButton.innerHTML = "Please install Metamask";
  }
}

async function fund() {
  const ethAmount = ethAmount.input.value;
  console.log(`Funding ${ethAmount}`);

  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
    await walletClient.requestAddresses();

    const { connectedAccount } = await walletClient.requestAddresses();
    const currentChain = await getCurrentChain(walletClient);

    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    });

    await publicClient.simulateContract({
      address: contractAddress,
      abi: abi,
      functionName: "fund",
      account: connectedAccount,
      chain: currentChain,
      value: parseEther(ethAmount),
    });
  } else {
    connectButton.innerHTML = "Please install Metamask";
  }
}

async function getCurrentChain(client) {
  const chainId = await client.getChainId();
  const currentChain = defineChain({
    id: chainId,
    name: "Custom Chain",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["http://localhost:8545"],
      },
    },
  });
  return currentChain;
}

connectButton.onclick = connect;
buyCoffee.onclick = fund;
