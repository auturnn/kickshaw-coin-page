import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { blockApiConnector } from "../Api";
import { BlockObject, getDate, Time } from "../object/BlockObject";
import { TxObject } from "../object/TransactionObject";

export const TxPage = ({ id, timestamp, txIns, txOuts }: TxObject) => {
  return (
    <div key={id} className="w-full my-3 border border-slate-700">
      <div className="w-full inline-block border-b border-b-slate-700">
        <div className="w-full h-5 my-4">
          <div
            className="float-left w-1/12 font-bold text-center font-xl"
            key={txIns[0].index}
          >
            Index
          </div>
          <div>{txIns[0].index}</div>
        </div>
        <div className="w-full h-5 my-4">
          <div className="float-left w-1/12 font-bold text-center font-xl">
            ID
          </div>
          <div>{txIns[0].txId}</div>
        </div>
        <div className="w-full h-5 my-4">
          <div className="float-left w-1/12 font-bold text-center font-xl">
            Signature
          </div>
          <div>{txIns[0].signature}</div>
        </div>
        <div className="w-full h-5 my-4">
          <div className="float-left w-1/12 font-bold text-center font-xl">
            Timestamp
          </div>
          <div>{getDate(timestamp, Time.SEC)}</div>
        </div>
      </div>
      <div className="w-full inline-block">
        {txOuts.map((out) => {
          return (
            <div>
              <div className="w-full h-5 my-4">
                <div className="float-left w-1/12 font-bold text-center font-xl">
                  address
                </div>
                <div>
                  <Link to={`/address/${out.address}`}>{out.address}</Link>
                </div>
              </div>
              <div className="w-full h-5 my-4">
                <div className="float-left w-1/12 font-bold text-center font-xl">
                  amount
                </div>
                <div>{out.amount}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BlockPage = () => {
  const [loading, setLoading] = useState(true);
  const [block, setBlock] = useState<BlockObject>();
  const { hash } = useParams();
  const getBlock = async () => {
    if (hash !== undefined) {
      const res = await blockApiConnector.getBlock(hash);
      console.log("aa");
      setBlock(res);
    }
  };
  useEffect(() => {
    getBlock();
    setLoading(false);
  }, [hash]);

  if (block === undefined) {
    return <div>Block List Loading</div>;
  }

  return (
    <div>
      {loading ? (
        <h1>Loading Block Data...</h1>
      ) : (
        <div key="blockInfo" className="w-[90%] m-auto">
          <h2 className="font-bold text-xl">Block {block.height} </h2>
          <table className="w-full border-separate border border-slate-300">
            <tr>
              <th className="border border-slate-600">Hash</th>
              <td>{block.hash}</td>
            </tr>
            <tr>
              <th className="border border-slate-600">PrevHash</th>
              <td>
                <Link to={`/block/${block.prevHash}`}>{block.prevHash}</Link>
              </td>
            </tr>
            <tr>
              <th className="border border-slate-600">Timestamp</th>
              <td>{getDate(block.timestamp, Time.SEC)}</td>
            </tr>
            <tr>
              <th className="border border-slate-600">Height</th>
              <td>{block.height}</td>
            </tr>
            <tr>
              <th className="border border-slate-600">Nonce</th>
              <td>{block.nonce}</td>
            </tr>
            <tr>
              <th className="border border-slate-600">Difficulty</th>
              <td>{block.difficulty}</td>
            </tr>
            <tr>
              <th className="border border-slate-600">Miner</th>
              <td>
                <Link to={`/address/${block.miner}`}>{block.miner}</Link>
              </td>
            </tr>
          </table>
          <h2 className="font-bold text-xl">Block Transaction</h2>
          {block.transactions.map((tx) => {
            return TxPage(tx);
          })}
        </div>
      )}
    </div>
  );
};

export default BlockPage;
