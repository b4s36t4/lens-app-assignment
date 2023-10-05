import { type ClassValue, clsx } from "clsx";
import { url } from "inspector";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function address(input: string) {
  return (
    input.substring(0, 4) +
    "..." +
    input.substring(input.length - 4, input.length)
  );
}

export function isIPFSProto(url: string) {
  if (!url) return false;
  return url.includes("ipfs://");
}

export function getImageURL(url?: string) {
  if (!url) return "/default.jpeg";
  const isIPFS = isIPFSProto(url);
  if (isIPFS) {
    const urlParts = url.split("/");
    const cid = `https://ipfs.io/ipfs/${urlParts[urlParts.length - 1]}`;
    return cid;
  }

  return url;
}
