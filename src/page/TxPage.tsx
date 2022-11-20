import { Link } from "react-router-dom";
import { getDate, Time } from "../object/BlockObject";
import { TxObject } from "../object/TransactionObject";

export const TxPage = ({ id, timestamp, txIns, txOuts }: TxObject) => {
  return (
    <div
      key={id}
      className="w-full h-full border-2 border-slate-700 rounded-md bg-[#1e2638] "
    >
      <div className="w-full inline-block border-b border-b-slate-700">
        <div className="w-full h-5 my-4">
          <div
            className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg bg-[#20283A]"
            key={txIns[0].index}
          >
            Index
          </div>
          <div className="text-slate-300 text-base">{txIns[0].index}</div>
        </div>
        <div className="w-full h-5 my-4">
          <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg bg-[#20283A]">
            ID
          </div>
          <div className="text-slate-300 text-base">{txIns[0].txId}</div>
        </div>
        <div className="w-full h-5 my-4">
          <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg bg-[#20283A]">
            Signature
          </div>
          <div className="text-slate-300 text-base">{txIns[0].signature}</div>
        </div>
        <div className="w-full h-5 my-4">
          <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg bg-[#20283A]">
            Timestamp
          </div>
          <div className="text-slate-300 text-base">
            {getDate(timestamp, Time.SEC)}
          </div>
        </div>
      </div>
      <div className="w-full inline-block">
        {txOuts.map((out) => {
          return (
            <div>
              <div className="w-full h-5 my-4">
                <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg bg-[#20283A]">
                  address
                </div>
                <div className="text-slate-300 text-base">
                  <Link to={`/address/${out.address}`}>{out.address}</Link>
                </div>
              </div>

              <div className="w-full h-5 my-4">
                <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg bg-[#20283A]">
                  amount
                </div>
                <div className="text-slate-300 text-base">{out.amount}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
