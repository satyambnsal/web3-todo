import { JsonRpcProvider } from "@ethersproject/providers";
import { RPC_URL } from "./constants";

const provider = new JsonRpcProvider(RPC_URL);

export const getProvider = () => {
  return provider;
};
