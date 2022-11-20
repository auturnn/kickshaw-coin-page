import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiConnector, { apiConnector } from "../Api";
import { UTxOut } from "../object/TransactionObject";
const txApiConnector = new ApiConnector("/balance");
const AddressInfoPage = () => {
  const [loading, setLoading] = useState(true);
  const [utxout, setUTxOut] = useState<UTxOut[]>();
  const [amount, setAmount] = useState<Number>(0);
  const { address } = useParams();

  const getUTxOut = async () => {
    if (address !== undefined) {
      const json = await txApiConnector.getTransactionList(address);
      setUTxOut(json);
    }
  };

  const getAmount = async () => {
    if (address !== undefined) {
      const json = await txApiConnector.getTotalBalance(address);
      setAmount(json);
    }
  };

  useEffect(() => {
    getAmount();
    getUTxOut();
    setLoading(false);
  }, []);

  if (utxout === undefined) {
    return <div>Not Found target address transaction List</div>;
  }

  return (
    <div className="">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div>total = {`${amount}`}</div>
          <div>{utxout.map((res) => UTxOutListPage(res))}</div>
        </div>
      )}
    </div>
  );
};

const UTxOutListPage = ({ txId, index, amount }: UTxOut) => {
  return (
    <div>
      <p>txID: {txId}</p>
      <p>index: {index}</p>
      <p>amount: {amount}</p>
    </div>
  );
};

export default AddressInfoPage;
