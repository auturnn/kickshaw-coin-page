import { TxObject } from "./TransactionObject";

export interface BlockChainStatusObject {
  newestHash: string;
  height: number;
  currentDifficulty: number;
}
export interface BlockObject {
  hash: string;
  prevHash: string;
  height: number;
  difficulty: number;
  nonce: number;
  miner: string;
  timestamp: number;
  transactions: Array<TxObject>;
}

export const omissionString = (hash: string | undefined) => {
  if (hash === "COINBASE") {
    return hash;
  }

  return `${hash?.slice(0, 5)}...${hash?.slice(44, 64)}`;
};

export enum Time {
  DATE = "date",
  HOUR = "hour",
  MIN = "min",
  SEC = "sec",
}

export const getDate = (timestamp: number, detail: Time) => {
  const date = new Date(timestamp * 1000);
  const setValue = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  switch (detail) {
    case Time.DATE: {
      return `${date.getFullYear()}-${setValue(date.getMonth() + 1)}-${setValue(
        date.getDate()
      )}`;
    }

    case Time.HOUR: {
      return `${date.getFullYear()}-${setValue(date.getMonth() + 1)}-${setValue(
        date.getDate()
      )} ${setValue(date.getHours())}...`;
    }

    default: {
      // Seconds
      return `${date.getFullYear()}-${setValue(date.getMonth() + 1)}-${setValue(
        date.getDate()
      )} ${setValue(date.getHours())}:${setValue(date.getMinutes())}:${setValue(
        date.getSeconds()
      )}`;
    }
  }
};
