import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blockApiConnector } from "../Api";
import {
  BlockObject,
  getDate,
  omissionString,
  Time,
} from "../object/BlockObject";
import Paging from "./Pagination";

const BlockPage = ({
  hash,
  prevHash,
  height,
  timestamp,
  miner,
  difficulty,
  nonce,
}: BlockObject) => {
  return (
    <tr
      key={hash}
      className="border-b border-b-slate-600 text-lg text-center text-slate-300"
    >
      <td>{height}</td>
      <td>
        <Link to={`/block/${hash}`}>{omissionString(hash)}</Link>
      </td>
      <td>
        <Link to={`/block/${prevHash}`}>{omissionString(prevHash)}</Link>
      </td>
      <td>{nonce}</td>
      <td>{difficulty}</td>
      <td>
        <Link to={`/address/${miner}`}>{omissionString(miner)}</Link>
      </td>
      <td>{getDate(timestamp, Time.DATE)}</td>
    </tr>
  );
};

const BlocksPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [blocks, setBlocks] = useState<Array<BlockObject>>();
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const getBlocks = async () => {
    const json = await blockApiConnector.getBlocks();
    setBlocks(json);
  };
  useEffect(() => {
    //5초마다 실행하여 업데이트
    //현재 페이지 첫 로드에도 5초가 걸리니 이 부분 수정바람
    getBlocks();
    setLoading(false);
  }, []);

  if (blocks === undefined) {
    return <div>Block List Loading</div>;
  }

  return (
    <div>
      {loading ? (
        <h1>Loading BlocksList...</h1>
      ) : (
        <div key="blocksList" className="flex w-[90%] m-auto dark:text-white">
          <table className="mb-3 border-separate border-spacing-5 border-2 border-slate-700 rounded-md bg-[#1e2638] ">
            <caption className="text-slate-200 text-xl font-bold text-left mb-4">
              The Lastest Block List
            </caption>
            <thead>
              <tr className="text-[#37BCF8] text-lg ">
                <th>Height</th>
                <th>Hash</th>
                <th>PrevHash</th>
                <th>Nonce</th>
                <th>Difficulty</th>
                <th>Miner</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {blocks.slice(offset, offset + limit).map((block) => {
                return BlockPage(block);
              })}
            </tbody>
          </table>
        </div>
      )}
      <Paging count={blocks.length} page={page} setPage={setPage} />
    </div>
  );
};

export default BlocksPage;
