import propTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { handleGetDashboard } from "../../../assets/api";

const Login = ({ setIsLogin }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const response = await handleGetDashboard();
    setData(response?.data || []);
    setError(response?.error || null);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full overflow-hidden card h-80">
      <div className="flex items-center justify-between gap-3 p-0 mb-4 text-left">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <label className="label-text">Your payment history list</label>
        </div>
        <button type="button" onClick={() => setIsLogin(false)}>
          Logout
        </button>
      </div>
      <section className="h-full overflow-auto">
        <div className="overflow-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th align="center">Order ID</th>
                <th align="center">Status</th>
                <th align="center">Amount</th>
                <th align="center">Type</th>
                <th align="center">User ID</th>
                <th align="center">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td align="center" colSpan={3}>
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <trd>
                  <td align="center" colSpan={3}>
                    {error || "Sorry, something went wrong"}
                  </td>
                </trd>
              ) : data?.length === 0 ? (
                <tr>
                  <td align="center" colSpan={3}>
                    No transaction found
                  </td>
                </tr>
              ) : (
                data?.map((item) => {
                  return (
                    <tr key={item?.id}>
                      <td>{item?.orderId || "-"}</td>
                      <td
                        align="center"
                        title={+item?.status === 1 ? "Success" : "Failed"}
                      >
                        {+item?.status === 1 ? "✅" : "❌"}
                      </td>
                      <td align="center">{item?.amount || "-"}</td>
                      <td align="center">{item?.type || "-"}</td>
                      <td align="center">{item?.userId || "-"}</td>
                      <td align="center">{item?.createdAt || "-"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

Login.propTypes = {
  setIsLogin: propTypes.func.isRequired,
};

export default Login;
