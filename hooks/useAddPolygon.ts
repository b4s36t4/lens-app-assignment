import { useRouter } from "next/navigation";

export const useAddPolygonNetwork = () => {
  const router = useRouter();

  const addChain = async () => {
    if (!window.ethereum) {
      alert("No Wallet Provided");
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x13881",
            chainName: "Mumbai",
            rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
          },
        ],
      });
      alert("Added Polygon");
      router.refresh();
    } catch {
      alert("Try again!!");
    }
  };

  return addChain;
};
