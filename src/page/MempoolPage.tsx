import { useEffect, useState } from "react";
import { apiConnector } from "../Api";
import { Mempool } from "../object/TransactionObject";
import { TxPage } from "./TxPage";

const MempoolPage = () => {
  const [loading, setLoading] = useState(true);
  const [mempool, setMempool] = useState<Mempool>();

  const getMempool = async () => {
    const res = await apiConnector.getMempool();
    console.log("mempool:", res);
    setMempool(res);
  };

  useEffect(() => {
    getMempool();
    setLoading(false);
  }, []);

  if (mempool === undefined) {
    return (
      <div>
        <h1>Transaction registered in Mempool does not exist.</h1>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <h1>Loading Block Data...</h1>
      ) : (
        <div className="w-[90%] mx-auto">
          <h2 className="text-slate-200 text-xl font-bold">
            <span>In Mempool has </span>
            <span className="text-[#37BCF8]">{`'${
              Object.entries(mempool).length
            }'`}</span>
            <span> Transactions</span>
          </h2>
          {Object.entries(mempool).map((mem) => {
            return (
              <div key={mem[0]} className="my-10">
                <p className=" text-slate-300 text-xl my-3 px-1 font-semibold">{`TxID : ${mem[0]}`}</p>
                {TxPage(mem[1])}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MempoolPage;
