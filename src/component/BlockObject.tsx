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

export interface TxObject {
  id: string;
  timestamp: number;
  txIns: Array<TxInObject>;
  txOuts: Array<TxOutObject>;
}

export interface TxInObject {
  txID: string;
  index: number;
  signature: string;
}

export interface TxOutObject {
  address: string;
  amount: number;
}

// interface UTxOut {
//   txID: string;
//   index: number;
//   amount: number;
// }

export const omissionString = (hash: string | undefined) => {
  if (hash === "COINBASE") {
    return hash;
  }
  return `${hash?.slice(0, 1)}...${hash?.slice(44, 64)}`;
};

export const getDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const setValue = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };
  return `${date.getFullYear()}-${setValue(date.getMonth() + 1)}-${setValue(
    date.getDate()
  )} ${setValue(date.getHours())}...`;
};
