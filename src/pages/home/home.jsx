import { useState } from "react";
import DepositForm from "./components/deposit-form";
import Login from "./components/login";
import WithdrawalForm from "./components/withdrawal-form";
import Dashboard from "./components/dashboard";
import Wallet from "./components/wallet";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [tab, setTab] = useState(1);

  return (
    <main className="container flex flex-col items-center justify-center w-full mx-auto min-h-svh">
      <section className="w-full max-w-lg p-10">
        <h1>💳 Payment App.</h1>
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Deposit"
            checked={tab === 1}
            onChange={() => setTab(1)}
          />
          <div
            role="tabpanel"
            className="p-6 tab-content bg-base-100 border-base-300 rounded-box"
          >
            <DepositForm />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Withdrawal"
            checked={tab === 2}
            onChange={() => setTab(2)}
          />
          <div
            role="tabpanel"
            className="p-6 tab-content bg-base-100 border-base-300 rounded-box"
          >
            <WithdrawalForm />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label={isLogin ? "Dashboard" : "Login"}
            checked={tab === 3}
            onChange={() => setTab(3)}
          />
          <div
            role="tabpanel"
            className="p-6 tab-content bg-base-100 border-base-300 rounded-box"
          >
            {isLogin ? (
               <Dashboard setIsLogin={setIsLogin} />
            ) : (
              <Login setIsLogin={setIsLogin} />
            )}
          </div>
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label={isLogin ? "Wallet" : ""}
            checked={tab === 4}
            onChange={() => setTab(4)}
          />
          <div
            role="tabpanel"
            className="p-6 tab-content bg-base-100 border-base-300 rounded-box"
          >
            {isLogin ? (
               <Wallet setIsLogin={setIsLogin} />
            ) : (
              <Login setIsLogin={setIsLogin} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
