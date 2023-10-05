import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

import { polygonMumbai } from "wagmi/chains";

const { publicClient, chains, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      options: {
        shimDisconnect: false,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export function WalletProvider({ children }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
