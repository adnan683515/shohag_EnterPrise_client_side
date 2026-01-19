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
    const [selectedTx, setSelectedTx] = useState<ITransactionPopulated | null>(null);

    const { data, isLoading } = useQuery<ITransactionApiResponse>({
        queryKey: ["allTransection"],
        queryFn: async () => {
            const res = await axiosSequre.get("/api/transeciton/all-transection");
            return res.data;
        },
        enabled: !!user?.tokens,
    });

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col justify-center items-center gap-4">
                <Loadingsuccess />
                <p className="text-[#025964] animate-pulse font-medium">Fetching transactions...</p>
            </div>
        );
    }

    return (
        <div className=" md:p-8  mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#025964]">
                        Recent Transactions
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Monitor your latest financial activities</p>
                </div>
                <div className="bg-[#025964]/10 px-4 py-2 rounded-full">
                    <span className="text-[#025964] font-semibold">Total: {data?.data?.length || 0}</span>
                </div>
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#025964] uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#025964] uppercase tracking-wider">Sender</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#025964] uppercase tracking-wider">Receiver</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#025964] uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-[#025964] uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {data?.data && data.data.length > 0 ? (
                                data.data.map((tx) => (
                                    <tr key={tx._id} className="hover:bg-blue-50/30 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-bold text-gray-900">৳ {tx.amount.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-700">{tx.sender.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-700">{tx.receiver.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {new Date(tx.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                            <button
                                                onClick={() => setSelectedTx(tx)}
                                                className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-[#025964] text-[#025964] font-medium rounded-lg hover:bg-[#025964] hover:text-white transition-all duration-300 shadow-sm"
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                                        No transactions found today.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Smooth Modal */}
            {selectedTx && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-[#025964]/40 backdrop-blur-md transition-opacity"
                        onClick={() => setSelectedTx(null)}
                    ></div>

                    {/* Modal Box */}
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
                        <div className="bg-[#025964] p-6 text-white flex justify-between items-center">
                            <h2 className="text-xl font-bold">Transaction Receipt</h2>
                            <button 
                                onClick={() => setSelectedTx(null)}
                                className="cursor-pointer p-1 hover:bg-white/20 rounded-full transition"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="text-center">
                                <p className="text-gray-500 text-sm uppercase tracking-widest">Amount Transferred</p>
                                <h3 className="text-4xl font-black text-[#025964] mt-1">৳ {selectedTx.amount}</h3>
                            </div>

                            <div className="space-y-4 border-t border-dashed pt-6">
                                <DetailRow label="Sender" value={selectedTx.sender.name} />
                                <DetailRow label="Receiver" value={selectedTx.receiver.name} />
                                <DetailRow label="Method" value={selectedTx.medium} isBadge />
                                <DetailRow label="Transaction ID" value={selectedTx.transactionId} isCopyable />
                                <DetailRow label="Date & Time" value={new Date(selectedTx.date).toLocaleString()} />
                            </div>

                            <button
                                onClick={() => setSelectedTx(null)}
                                className="cursor-pointer w-full py-4 bg-[#025964] text-white rounded-2xl font-bold shadow-lg shadow-[#025964]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Close Receipt
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper Component for Modal Rows
const DetailRow = ({ label, value, isBadge = false, isCopyable = false }: { label: string, value: string, isBadge?: boolean, isCopyable?: boolean }) => (
    <div className="flex justify-between items-start">
        <span className="text-gray-400 text-sm">{label}</span>
        <span className={`text-sm font-semibold text-right ${
            isBadge ? "bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs uppercase" : "text-gray-800"
        } ${isCopyable ? "font-mono text-xs break-all max-w-[180px]" : ""}`}>
            {value}
        </span>
    </div>
);

export default Transection;