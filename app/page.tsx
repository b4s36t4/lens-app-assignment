"use client";

import Feed from "@/components/Feed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { address } from "@/lib/utils";
import {
  useActiveProfile,
  useActiveWallet,
  useCreateProfile,
  isValidHandle,
} from "@lens-protocol/react-web";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const { data: wallet } = useActiveWallet();

  const { data: profile, loading } = useActiveProfile();

  const { execute: create, isPending: isCreating } = useCreateProfile();

  const [handle, setHandle] = useState<string>("");

  const onCreate = async () => {
    if (!handle) {
      alert("Please enter handle");
      return;
    }
    const isValid = isValidHandle(handle);
    console.log(isValid, "vali?");
    await create({ handle });
    router.refresh();
  };

  return (
    <main
      className="
      px-6 py-14
      sm:px-10
    "
    >
      <Head>
        <title>Lens Profile</title>
      </Head>
      <div>
        {wallet ? (
          <p className="font-bold">Logged in as {address(wallet.address)}</p>
        ) : (
          "Not Logged in"
        )}
      </div>
      <div className="flex items-center justify-center mt-4">
        {!!wallet && !loading && !profile && (
          <div className="w-80">
            <Input
              placeholder="Enter handle"
              value={handle}
              onChange={(e) => {
                setHandle(e.target.value);
              }}
            />
            <Button disabled={isCreating} className="mt-2" onClick={onCreate}>
              Create a Profile
            </Button>
          </div>
        )}
      </div>
      <div className="flex items-start">
        <div className="w-4/12 mt-4">
          <h1 className="font-bold text-xl mb-10">Post What you think!!!</h1>
          <Textarea placeholder="Write something..." className="h-56" />
          <Button className="mt-4 w-5/12 float-right">Send</Button>
        </div>
        <div className="w-6/12 ml-32">
          {!!wallet ? <Feed /> : <p>Login to see the feed</p>}
        </div>
      </div>
    </main>
  );
}
