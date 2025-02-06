import React from "react";
import Navbar from "./Navbar";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";

export default function PaymentHistory() {
  const transactions = [
    {
      id: "TXN789456123",
      date: "2024-02-06",
      time: "14:30:25",
      amount: 1500.0,
      status: "successful",
    },
    {
      id: "TXN789456124",
      date: "2024-02-06",
      time: "12:15:30",
      amount: 2500.0,
      status: "unsuccessful",
    },
    {
      id: "TXN789456125",
      date: "2024-02-05",
      time: "16:45:10",
      amount: 1000.0,
      status: "withdrawn",
    },
    {
      id: "TXN789456123",
      date: "2024-02-06",
      time: "14:30:25",
      amount: 1500.0,
      status: "successful",
    },
    {
      id: "TXN789456124",
      date: "2024-02-06",
      time: "12:15:30",
      amount: 2500.0,
      status: "unsuccessful",
    },
    {
      id: "TXN789456125",
      date: "2024-02-05",
      time: "16:45:10",
      amount: 1000.0,
      status: "withdrawn",
    },
    {
      id: "TXN789456123",
      date: "2024-02-06",
      time: "14:30:25",
      amount: 1500.0,
      status: "successful",
    },
    {
      id: "TXN789456124",
      date: "2024-02-06",
      time: "12:15:30",
      amount: 2500.0,
      status: "unsuccessful",
    },
    {
      id: "TXN789456125",
      date: "2024-02-05",
      time: "16:45:10",
      amount: 1000.0,
      status: "withdrawn",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "successful":
        return "bg-green-100 text-green-800";
      case "unsuccessful":
        return "bg-red-100 text-red-800";
      case "withdrawn":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertSymbol = (status) => {
    switch (status.toLowerCase()) {
      case "successful":
        return <FaRegThumbsUp className="w-6 h-6 text-green-600" />;
      case "unsuccessful":
        return <FaRegThumbsDown className="w-6 h-6 text-red-600" />;
      case "withdrawn":
        return <FaMoneyBillTransfer className="w-8 h-8 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="max-w-full ml-[13%] min-h-[46rem] bg-gray-50">
        <div className="max-w-[100rem]">
          <div className="bg-blue-500 rounded-lg">
            <div className="px-6 py-4 border-gray-300">
              <h2 className="text-3xl font-bold rye-regular text-white">
                Payment History
              </h2>
              <p className="text-md rye-regular text-white mt-1">
                View all your transaction details
              </p>
            </div>

            <div className="">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                      Alert Symbol
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-300">
                      <td className="px-6 py-4 text-xl whitespace-nowrap">
                        <div className="text-black">{transaction.date}</div>
                        <div className="text-gray-400">{transaction.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-mono text-xl text-gray-900">
                          {transaction.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900 text-xl">
                          ₹{transaction.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex leading-5 text-xl font-semibold rounded-full ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 whitespace-nowrap">
                        <div className="pl-20 text-xl">
                          {getAlertSymbol(transaction.status)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {transactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
