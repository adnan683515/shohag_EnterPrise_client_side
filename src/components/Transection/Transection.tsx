import { useQuery } from "@tanstack/react-query";
import { AxiosSequre } from "../../axois/AxiosSequre";
import Loadingsuccess from "../Loader/Loadingsuccess";
import ReduxAuthHoook from "../../Hooks/ReduxAuthHoook";
import type {
    ITransactionApiResponse,
    ITransactionPopulated,
} from "./TransectionType";
import { useState } from "react";

const Transection = () => {
    const axiosSequre = AxiosSequre();
    const user = ReduxAuthHoook();

    // Modal state
    const [selectedTx, setSelectedTx] =
        useState<ITransactionPopulated | null>(null);

    // Fetch transactions using TanStack Query
    const { data, isLoading } = useQuery<ITransactionApiResponse>({
        queryKey: ["allTransection"],
        queryFn: async () => {
            const res = await axiosSequre.get(
                "/api/transeciton/all-transection"
            );
            return res.data;
        },
        enabled: !!user?.tokens,
    });



    
    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loadingsuccess />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            {/* ===== Heading ===== */}
            <h1 className="text-xl md:text-2xl font-semibold mb-4 text-[#025964]">
                Today Transactions
            </h1>

            {/* ===== Responsive Table Wrapper ===== */}
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full border border-gray-200">
                    {/* ===== Table Header ===== */}
                    <thead className="bg-[#025964] text-white">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm">Amount</th>
                            <th className="px-4 py-3 text-left text-sm">Sender</th>
                            <th className="px-4 py-3 text-left text-sm">Receiver</th>
                            <th className="px-4 py-3 text-left text-sm">Date</th>
                            <th className="px-4 py-3 text-center text-sm">Action</th>
                        </tr>
                    </thead>

                    {/* ===== Table Body ===== */}
                    <tbody className="bg-white">
                        {data?.data.map((tx) => (
                            <tr
                                key={tx._id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3 text-sm font-medium">
                                    ৳ {tx.amount}
                                </td>

                                <td className="px-4 py-3 text-sm">
                                    {tx.sender.name}
                                </td>

                                <td className="px-4 py-3 text-sm">
                                    {tx.receiver.name}
                                </td>

                                <td className="px-4 py-3 text-sm">
                                    {new Date(tx.date).toLocaleDateString()}
                                </td>

                                <td className="px-4 py-3 text-center">
                                    {/* View Button */}
                                    <button
                                        onClick={() => setSelectedTx(tx)}
                                        className="px-4 py-1.5 text-white text-sm rounded
                    bg-gradient-to-r from-[#025964] to-[#013a3f]
                    hover:opacity-90 cursor-pointer transition"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ===== Modal ===== */}
            {selectedTx && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center
          bg-black/40 backdrop-blur-sm"
                >
                    {/* Modal Box */}
                    <div
                        className="bg-white rounded-xl shadow-lg w-[90%] max-w-md
            transform transition-all duration-300 scale-100 opacity-100"
                    >
                        {/* Modal Header */}
                        <div className="px-5 py-3 border-b flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-[#025964]">
                                Transaction Details
                            </h2>
                            <button
                                onClick={() => setSelectedTx(null)}
                                className="text-gray-500 hover:text-red-500 cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-5 space-y-2 text-sm">
                            <p>
                                <strong>Amount:</strong> ৳ {selectedTx.amount}
                            </p>
                            <p>
                                <strong>Sender:</strong> {selectedTx.sender.name}
                            </p>
                            <p>
                                <strong>Receiver:</strong>{" "}
                                {selectedTx.receiver.name}
                            </p>
                            <p>
                                <strong>Medium:</strong> {selectedTx.medium}
                            </p>
                            <p>
                                <strong>Transaction ID:</strong>{" "}
                                {selectedTx.transactionId}
                            </p>
                            <p>
                                <strong>Date:</strong>{" "}
                                {new Date(selectedTx.date).toLocaleString()}
                            </p>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-5 py-3 border-t text-right">
                            <button
                                onClick={() => setSelectedTx(null)}
                                className="px-4 py-1.5 rounded text-white
                bg-gradient-to-r from-[#025964] to-[#013a3f]
                hover:opacity-90 cursor-pointer transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transection;
