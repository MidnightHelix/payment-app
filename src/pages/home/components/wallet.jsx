import propTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { handleGetWallet } from "../../../assets/api";

const Login = ({ setIsLogin }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const response = await handleGetWallet();
    setData(response?.data || {});
    setError(response?.error || null);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  return (
    <div className="w-full overflow-hidden card h-80">
      <div className="flex items-center justify-between gap-3 p-0 mb-4 text-left">
        <div>
          <h1 className="text-2xl font-bold">Wallet</h1>
          <label className="label-text">Your Balance</label>
        </div>
        <button type="button" onClick={() => setIsLogin(false)}>
          Logout
        </button>
      </div>
      <section className="h-full overflow-auto">
        <div className="overflow-auto">
          <section className="h-full overflow-auto">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <ul>
                {data ? (
                  <li key={data.id}>
                    <h2 className="text-2xl font-bold">{data.balance}</h2>
                  </li>
                ) : (
                  <p>No data available</p>
                )}
              </ul>
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

Login.propTypes = {
  setIsLogin: propTypes.func.isRequired,
};

export default Login;
