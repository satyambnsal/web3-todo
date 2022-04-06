import { IS_MAINNET } from "./constants";

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

export function etherscanAddress(address: string) {
  return `https://${
    IS_MAINNET ? "" : "rinkeby."
  }etherscan.io/address/${address}`;
}

export function etherscanTx(address: string) {
  return `https://${IS_MAINNET ? "" : "rinkeby."}etherscan.io/tx/${address}`;
}

export function etherscanToken(address: string) {
  return `https://${IS_MAINNET ? "" : "rinkeby."}etherscan.io/token/${address}`;
}

export function openSeaUrl(contractAddress: string, tokenId: string) {
  return `https://${
    IS_MAINNET ? "" : "testnets."
  }opensea.io/assets/${contractAddress}/${tokenId}`;
}
