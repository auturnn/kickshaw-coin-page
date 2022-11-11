import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="dark:text-white">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Link to={"/blocks"}>Blocks</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
