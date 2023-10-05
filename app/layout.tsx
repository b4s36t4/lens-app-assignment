"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Droplets, LogOut } from "lucide-react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { polygonMumbai } from "wagmi/chains";

import { ThemeProvider } from "@/components/theme-provider";

import LensProvider from "./lens-provider";
import { WalletProvider } from "./WalletProvider";
import { Button } from "@/components/ui/button";
import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";
import {
  useActiveWallet,
  useWalletLogin,
  useWalletLogout,
} from "@lens-protocol/react-web";
import { useAddPolygonNetwork } from "@/hooks/useAddPolygon";

const inter = Inter({ subsets: ["latin"] });

function Nav() {
  const router = useRouter();

  const { data: wallet, loading } = useActiveWallet();

  const { address, isConnected, connector } = useAccount();
  const pathname = usePathname();

  const [isPolygon, setIsPolygon] = useState(true);

  const addPolygon = useAddPolygonNetwork();

  useEffect(() => {
    if (!address || !isConnected || !connector?.isAuthorized) return;
    const checkChainId = async () => {
      const connectedChainId = await connector?.getChainId();

      if (connectedChainId !== polygonMumbai.id) {
        setIsPolygon(false);
      }
    };
    checkChainId();
  }, [address, connector, isConnected]);

  const {
    execute: login,
    error: loginError,
    isPending: isLoginPending,
  } = useWalletLogin();

  const { execute: logout, isPending: isLogoutPending } = useWalletLogout();

  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    let connector: Connector<any, any> | undefined;
    try {
      const { connector: _connector } = await connectAsync();
      connector = _connector;
    } catch {
      alert("No wallet found");
    }

    if (connector instanceof InjectedConnector) {
      const walletClient = await connector.getWalletClient();
      await login({
        address: walletClient.account.address,
      });
    }
  };

  return (
    <nav
      className="
    border-b flex
    flex-col sm:flex-row
    items-start sm:items-center
    py-2
    sm:pr-10
    "
    >
      <div className="py-3 px-8 flex flex-1 items-center p">
        <Link href="/" className="mr-5 flex items-center">
          <Droplets className="opacity-85" size={19} />
          <p className={`ml-2 mr-4 text-lg font-semibold`}>lenscn</p>
        </Link>
        <Link
          href="/"
          className={`mr-5 text-sm ${pathname !== "/" && "opacity-50"}`}
        >
          <p>Home</p>
        </Link>
        <Link
          href="/search"
          className={`mr-5 text-sm ${pathname !== "/search" && "opacity-60"}`}
        >
          <p>Search</p>
        </Link>
        <Link
          href="/explore"
          className={`mr-5 text-sm ${pathname !== "/explore" && "opacity-60"}`}
        >
          <p>Explore</p>
        </Link>
      </div>
      <div
        className="
        flex
        sm:items-center
        pl-8 pb-3 sm:p-0
      "
      >
        {!wallet && (
          <Button
            className="mr-4"
            disabled={isLoginPending}
            onClick={onLoginClick}
          >
            Connect
          </Button>
        )}
        {!!wallet && !isPolygon && (
          <Button
            className="mr-4"
            onClick={() => {
              addPolygon();
              router.refresh();
            }}
          >
            Switch to Polygon
          </Button>
        )}
        {isPolygon && address && (
          <Button
            onClick={async () => {
              await disconnectAsync();
              await logout();
            }}
            disabled={isLogoutPending}
            variant="secondary"
            className="mr-4"
          >
            Sign out
            <LogOut className="h-4 w-4 ml-3" />
          </Button>
        )}
      </div>
    </nav>
  );
}

export default function RootLayout({ children, ...props }) {
  return (
    <html lang="en">
      <WalletProvider>
        <LensProvider>
          <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Nav />
              {children}
            </ThemeProvider>
          </body>
        </LensProvider>
      </WalletProvider>
    </html>
  );
}
