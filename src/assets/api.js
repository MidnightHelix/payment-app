import axios from "axios";

const DUMMY_DASHBOARD_DATA = [
  { transaction_id: "tx_1", status: 1, timestamp: "2024-05-02T08:00:00Z" },
  { transaction_id: "tx_2", status: 2, timestamp: "2024-05-02T08:05:00Z" },
  { transaction_id: "tx_3", status: 1, timestamp: "2024-05-02T08:10:00Z" },
  { transaction_id: "tx_4", status: 2, timestamp: "2024-05-02T08:15:00Z" },
  { transaction_id: "tx_5", status: 1, timestamp: "2024-05-02T08:20:00Z" },
  { transaction_id: "tx_6", status: 2, timestamp: "2024-05-02T08:25:00Z" },
  { transaction_id: "tx_7", status: 1, timestamp: "2024-05-02T08:30:00Z" },
  { transaction_id: "tx_8", status: 2, timestamp: "2024-05-02T08:35:00Z" },
  { transaction_id: "tx_9", status: 1, timestamp: "2024-05-02T08:40:00Z" },
  { transaction_id: "tx_10", status: 2, timestamp: "2024-05-02T08:45:00Z" },
  { transaction_id: "tx_11", status: 1, timestamp: "2024-05-02T08:50:00Z" },
  { transaction_id: "tx_12", status: 2, timestamp: "2024-05-02T08:55:00Z" },
  { transaction_id: "tx_13", status: 1, timestamp: "2024-05-02T09:00:00Z" },
  { transaction_id: "tx_14", status: 2, timestamp: "2024-05-02T09:05:00Z" },
  { transaction_id: "tx_15", status: 1, timestamp: "2024-05-02T09:10:00Z" },
  { transaction_id: "tx_16", status: 2, timestamp: "2024-05-02T09:15:00Z" },
  { transaction_id: "tx_17", status: 1, timestamp: "2024-05-02T09:20:00Z" },
  { transaction_id: "tx_18", status: 2, timestamp: "2024-05-02T09:25:00Z" },
  { transaction_id: "tx_19", status: 1, timestamp: "2024-05-02T09:30:00Z" },
  { transaction_id: "tx_20", status: 2, timestamp: "2024-05-02T09:35:00Z" },
];

export const handlePostDeposit = async (payload) => {
  try {
    const data = {
      amount: payload.amount,
      timestamp: payload.timestamp,
      orderId: payload.order_id,
    };

     const token = localStorage.getItem('token');
    
     await axios.post("http://127.0.0.1:3000/transactions/deposit", data, {
       headers: {
         Authorization: `Bearer ${token}`
       }
     });

    alert("Deposit was successful");
    return true;
  } catch (error) {
    alert(error?.response?.data?.message || error?.message);
    return false;
  }
};

export const handlePostWithdrawal = async (payload) => {
  try {
    const data = {
      amount: payload.amount,
      timestamp: payload.timestamp,
      orderId: payload.order_id,
    };

     const token = localStorage.getItem('token');

     await axios.post("http://localhost:3000/transactions/withdraw", data, {
       headers: {
         Authorization: `Bearer ${token}`
       }
     });

    alert("Withdrawal was successful");
    return true;
  } catch (error) {
    alert(error?.response?.data?.message || error?.message);
    return false;
  }
};

export const handlePostLogin = async (payload) => {
  try {
    const data = {
      email: payload.email,
      password: payload.password,
    };
    const response = await axios.post("http://localhost:3000/users/login", data);
    // Save the token to localStorage
    localStorage.setItem('token', response.data.token);

    alert("Login was successful");
    return true;
  } catch (error) {
    alert(error?.response?.data?.message || error?.message);
    return false;
  }
};

export const handleGetDashboard = async () => {
  try {

    const token = localStorage.getItem('token');

    const response = await axios.get("http://127.0.0.1:3000/transactions", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
   // const response = { data: DUMMY_DASHBOARD_DATA };
    return {
      data: response?.data?.data || [],
      error: null,
    };
  } catch (error) {
    alert(error?.response?.data?.message || error?.message);
    return {
      error: error?.response?.data?.message || error?.message,
      data: null,
    };
  }
};

export const handleGetWallet = async () => {
  try {

    const token = localStorage.getItem('token');

    const response = await axios.get("http://127.0.0.1:3000/wallets", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {
      data: response?.data?.data || [],
      error: null,
    };
  } catch (error) {
    alert(error?.response?.data?.message || error?.message);
    return {
      error: error?.response?.data?.message || error?.message,
      data: null,
    };
  }
};
