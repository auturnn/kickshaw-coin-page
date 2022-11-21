import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { blockApiConnector } from "../Api";
import { BlockObject, getDate, Time } from "../object/BlockObject";
import { slicingAddress } from "../object/TransactionObject";
import { TxPage } from "./TxPage";

const BlockPage = () => {
  const [loading, setLoading] = useState(true);
  const [block, setBlock] = useState<BlockObject>();
  const { hash } = useParams();

  const getBlock = async () => {
    if (hash !== undefined) {
      const res = await blockApiConnector.getBlock(hash);
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
        <div key="blockInfo" className="w-[85%] m-auto">
          <table className="w-full h-full rounded-md border-2 border-separate border-spacing-5 border-slate-700 bg-[#1e2638] mb-10">
            <caption className="mb-5">
              <h2 className="font-semibold text-xl text-slate-200 text-left">
                <span className="text-slate-300">Block No.</span>
                <span className="text-[#37BCF8]">{block.height}</span>
              </h2>
            </caption>
            <tbody>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  Hash
                </th>
                <td className="px-1 text-slate-300">{block.hash}</td>
              </tr>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  PrevHash
                </th>
                <td className="px-1 text-slate-300">
                  <Link to={`/block/${block.prevHash}`}>{block.prevHash}</Link>
                </td>
              </tr>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  Timestamp
                </th>
                <td className="px-1 text-slate-300">
                  {getDate(block.timestamp, Time.SEC)}
                </td>
              </tr>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  Height
                </th>
                <td className="px-1 text-slate-300">{block.height}</td>
              </tr>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  Nonce
                </th>
                <td className="px-1 text-slate-300">{block.nonce}</td>
              </tr>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  Difficulty
                </th>
                <td className="px-1 text-slate-300">{block.difficulty}</td>
              </tr>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  Miner
                </th>
                <td className="px-1 text-slate-300">
                  <Link to={`/address/${block.miner}`}>
                    {slicingAddress(block.miner)}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          <h2 className="font-bold text-xl text-slate-300">
            Block Transaction List
          </h2>
          {block.transactions.map((tx) => {
            return TxPage(tx);
          })}
        </div>
      )}
    </div>
  );
};

export default BlockPage;
