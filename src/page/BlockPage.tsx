import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { blockApiConnector } from "../Api";
import { BlockObject, TxObject } from "../component/BlockObject";

const TxPage = ({ txId, timestamp, txIns, txOuts }: TxObject) => {
  return (
    <div key={txId} className="w-full my-3 border border-slate-700">
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
      </div>
      <div className="w-full inline-block">
        {txOuts.map((out) => {
          return (
            <div>
              <div className="w-full h-5 my-4">
                <div className="float-left w-1/12 font-bold text-center font-xl">
                  address
                </div>
                <div>{out.address}</div>
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
  useEffect(() => {
    if (hash !== undefined) {
      blockApiConnector.getBlock(hash).then((res) => {
        console.log(block);
        setBlock(res);
        return res;
      });
    }

    setLoading(false);
  }, []);

  if (block === undefined) {
    return <div>Block List Loading</div>;
  }

  return (
    <div>
      {loading ? (
        <h1>Loading Block Data...</h1>
      ) : (
        <div key="blockInfo" className="dark:text-white">
          <h2 className="font-bold text-xl">Block {block.height} </h2>
          <table className="w-full border-separate border border-slate-300">
            <tr>
              <th className="border border-slate-600">Hash</th>
              <td>{block.hash}</td>
            </tr>
            <tr>
              <th className="border border-slate-600">PrevHash</th>
              <td>{block.prevHash}</td>
            </tr>
            <tr>
              <th className="border border-slate-600">Timestamp</th>
              <td>{block.timestamp}</td>
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
              <td>{block.miner}</td>
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
