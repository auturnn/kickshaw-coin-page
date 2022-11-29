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

export interface UTxOut {
  blockHash: string;
  txID: string;
  index: number;
  amount: number;
}

export type Mempool = {
  [Property in keyof string]: TxObject;
};

export const slicingAddress = (address: string) => {
  return address.slice(0, 5);
};
