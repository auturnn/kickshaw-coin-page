import { Link } from "react-router-dom";
import { getDate, Time } from "../object/BlockObject";
import {
  TxObject,
  TxInObject,
  TxOutObject,
  slicingAddress,
} from "../object/TransactionObject";

const TxInsPage = (
  { txID, index, signature }: TxInObject,
  timestamp: number
) => {
  return (
    <div className="w-full inline-block border-b border-b-slate-700" key={txID}>
      <div className="w-full my-2">
        <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg bg-[#20283A]">
          Index
        </div>
        <div className="text-slate-300 text-base">{index}</div>
      </div>
      <div className="w-full my-4">
        <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg bg-[#20283A]">
          ID
        </div>
        <div className="text-slate-300 text-base">
          {txID === "" ? "MINEND BLOCK" : txID}
        </div>
      </div>
      <div className="w-full my-4">
        <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg bg-[#20283A]">
          Signature
        </div>
        <div className="text-slate-300 text-base">{signature}</div>
      </div>
      <div className="w-full my-4">
        <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg bg-[#20283A]">
          Timestamp
        </div>
        <div className="text-slate-300 text-base">
          {getDate(timestamp, Time.SEC)}
        </div>
      </div>
    </div>
  );
};

const TxOutsPage = ({ address, amount }: TxOutObject) => {
  return (
    <div className="border-b border-slate-700">
      <div className="w-full my-3">
        <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg ">
          Address
        </div>
        <div className="text-slate-300 text-base">
          <Link to={`/address/${address}`}>{slicingAddress(address)}</Link>
        </div>
      </div>
      <div className="w-full my-4">
        <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg ">
          Amount
        </div>
        <div className="text-slate-300 text-base">{amount}</div>
      </div>
    </div>
  );
};

export const TxPage = ({ id, timestamp, txIns, txOuts }: TxObject) => {
  return (
    <div
      key={id}
      className="w-full h-full border-2 border-slate-700 rounded-md bg-[#1e2638] mb-10 mt-5"
    >
      ID: {id}
      {txIns.map((txIn) => {
        return TxInsPage(txIn, timestamp);
      })}
      <div className="w-full inline-block">
        {txOuts.map((txout) => {
          return TxOutsPage(txout);
        })}
      </div>
    </div>
  );
};
