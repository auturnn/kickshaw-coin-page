import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiConnector, { blockApiConnector } from "../Api";
import { BlockObject, getDate, omissionString } from "../component/BlockObject";

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
    <tr>
      <td>{height}</td>
      <td>
        <Link to={`/block/${hash}`}>{omissionString(hash)}</Link>
      </td>
      <td>
        <Link to={`/block/${prevHash}`}>{omissionString(prevHash)}</Link>
      </td>
      <td>{nonce}</td>
      <td>{difficulty}</td>
      <td>{omissionString(miner)}</td>
      <td>{getDate(timestamp)}</td>
    </tr>
  );
};

const BlocksPage = () => {
  const [loading, setLoading] = useState(true);
  const [blocks, setBlocks] = useState<Array<BlockObject>>();

  useEffect(() => {
    //5초마다 실행하여 업데이트
    //현재 페이지 첫 로드에도 5초가 걸리니 이 부분 수정바람
    blockApiConnector
      .getBlocks()
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((res) => setBlocks(res));

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
        <div key="blocksList" className="flex dark:text-white">
          <table className="border-separate border border-slate-500">
            <thead>
              <tr>
                <th className="border border-slate-600 text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                  Height
                </th>
                <th className="border border-slate-600">Hash</th>
                <th className="border border-slate-600">PrevHash</th>
                <th className="border border-slate-600">Nonce</th>
                <th className="border border-slate-600">Difficulty</th>
                <th className="border border-slate-600">Miner</th>
                <th className="border border-slate-600">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((block) => {
                return BlockPage(block);
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlocksPage;
