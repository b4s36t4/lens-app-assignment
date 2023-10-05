"use client";

import { isValidHandle } from "@lens-protocol/react-web";
import { Loader2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const router = useRouter();

  const { handle } = useParams();

  const [userHandle, setUserHandle] = useState("");

  console.log(handle, "h");

  // useEffect(() => {
  //   if (!handle) return;
  //   console.log(handle,"hans")
  //   // const isHandleValid = isValidHandle(handle as string);
  //   if (!isHandleValid) {
  //     alert("No valid handle, quitting");
  //     router.push("/404");
  //   }
  // }, [handle, router]);

  if (!handle) {
    router.push("/404");
    return <></>;
  }

  return (
    <div className="flex items-center justify-center w-full mt-10">
      <Loader2 className="mr-2 h-12 w-12 flex items-center justify-center animate-spin" />
    </div>
  );
};

export default UserProfile;
