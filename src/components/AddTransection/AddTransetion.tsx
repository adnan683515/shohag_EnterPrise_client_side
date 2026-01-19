import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosSequre } from "../../axois/AxiosSequre";
import { toast } from 'react-hot-toast';
import type { AxiosError } from 'axios';

interface IUser {
    _id: string;
    name: string;
    email: string;
}

interface ITransactionInput {
    amount: number;
    sender: string;
    receiver: string;
    medium: string;
    date: string;
}

interface IBackendError {
    message: string;
    success: boolean;
}

const AddTransetion = () => {
    const axiosSequre = AxiosSequre();
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ITransactionInput>({
        defaultValues: {
            date: new Date().toISOString().split('T')[0],
            medium: ''
        }
    });

    // ইউজার লিস্ট ফেচ করা
    const { data: users, isLoading: usersLoading } = useQuery<{ data: IUser[] }>({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await axiosSequre.get("/api/user/allUsers");
            return res.data;
        }
    });

    // লেনদেন তৈরির মিউটেশন
    const { mutate, isPending } = useMutation({
        mutationFn: async (newData: ITransactionInput) => {
            const res = await axiosSequre.post("/api/transeciton/createTransection", newData);
            return res.data;
        },
        onSuccess: () => {
            toast.success("লেনদেন সফলভাবে সম্পন্ন হয়েছে!");
            queryClient.invalidateQueries({ queryKey: ["allTransection"] });
            reset();
        },
        onError: (error: AxiosError<IBackendError>) => {
            toast.error(error.response?.data?.message || "কিছু একটা সমস্যা হয়েছে");
        }
    });

    const onSubmit = (data: ITransactionInput) => mutate(data);

    return (
        <div className="min-h-screen w-full bg-[#f0f4f8] flex flex-col items-center justify-center p-4 md:p-10">

            {/* মেইন টাইটেল - ফর্মের উপরে */}
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-black text-[#025964] tracking-tight mb-3">
                    সেন্ট্রাল ট্রানজেকশন ম্যানেজমেন্ট
                </h1>
                <div className="h-1.5 w-32 bg-[#025964] mx-auto rounded-full"></div>
            </div>

            {/* মেইন কন্টেইনার */}
            <div className="w-full max-w-6xl bg-white rounded-[3.5rem] shadow-[0_60px_120px_-20px_rgba(2,89,100,0.15)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row min-h-[750px]">

                {/* বাম পাশের প্যানেল */}
                <div className="lg:w-[30%] bg-[#025964] p-12 text-white flex flex-col justify-between relative">
                    <div className="relative z-10">
                        <div className="inline-block p-4 bg-white/10 rounded-2xl mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold leading-snug">নিরাপদ ডিজিটাল ব্যাংকিং হাব</h2>
                        <p className="mt-4 text-teal-100/70 font-light">সিস্টেমের মাধ্যমে প্রেরক এবং প্রাপকের মধ্যে দ্রুত ফান্ড ট্রান্সফার নিশ্চিত করুন।</p>
                    </div>

                    <div className="mt-10 p-6 bg-black/20 rounded-3xl backdrop-blur-sm border border-white/5">
                        <p className="text-xs uppercase tracking-[0.2em] text-teal-300 font-bold mb-2">স্ট্যাটাস</p>
                        <p className="text-sm font-medium italic">"সব তথ্য ডাবল-চেক করে নিন।"</p>
                    </div>
                </div>

                {/* ডান পাশের ফর্ম সেকশন */}
                <div className="lg:w-[70%] p-8 md:p-16">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

                        {/* গ্রিড লেআউট: প্রেরক, প্রাপক এবং মেথড */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {/* প্রেরক */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-500 ml-1">প্রেরক (Sender)</label>
                                <select
                                    {...register("sender", { required: "প্রেরক নির্বাচন করুন" })}
                                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#025964] outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
                                >
                                    <option value="">ইউজার সিলেক্ট করুন</option>
                                    {users?.data.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                                </select>
                                {errors.sender && <p className="text-red-500 text-xs font-bold">{errors.sender.message}</p>}
                            </div>

                            {/* প্রাপক */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-500 ml-1">প্রাপক (Receiver)</label>
                                <select
                                    {...register("receiver", { required: "প্রাপক নির্বাচন করুন" })}
                                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#025964] outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
                                >
                                    <option value="">ইউজার সিলেক্ট করুন</option>
                                    {users?.data.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                                </select>
                                {errors.receiver && <p className="text-red-500 text-xs font-bold">{errors.receiver.message}</p>}
                            </div>



                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-500 ml-1">পেমেন্ট মেথড (Method)</label>
                                <select
                                    {...register("medium", { required: "মেথড নির্বাচন করুন" })}
                                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#025964] outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
                                >
                                    <option value="">ইউজার সিলেক্ট করুন</option>
                                    {users?.data.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                                </select>
                                {errors.medium && <p className="text-red-500 text-xs font-bold">{errors.medium.message}</p>}
                            </div>



                        </div>

                        {/* তারিখ এবং টাকার পরিমাণ */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-500 ml-1">লেনদেনের তারিখ</label>
                                <input
                                    type="date"
                                    {...register("date", { required: "তারিখ দিন" })}
                                    className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-[#025964] outline-none transition-all font-bold text-gray-700"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-500 ml-1">টাকার পরিমাণ (Amount)</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-[#025964]">৳</span>
                                    <input
                                        type="number"
                                        {...register("amount", { required: "টাকার পরিমাণ লিখুন", valueAsNumber: true, min: 1 })}
                                        className="w-full pl-14 pr-8 py-5 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#025964] outline-none transition-all text-2xl font-black text-gray-800"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* সাবমিট বাটন */}
                        <div className="pt-10">
                            <button
                                type="submit"
                                disabled={isPending || usersLoading}
                                className={`w-full py-8 rounded-[2.5rem] font-black text-2xl text-white shadow-2xl transition-all duration-500 flex items-center justify-center gap-4
                                    ${isPending
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-gradient-to-r from-[#025964] to-[#01353b] hover:shadow-[#025964]/40 hover:-translate-y-1.5 active:scale-95 cursor-pointer"
                                    }`}
                            >
                                {isPending ? (
                                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>কনফার্ম ট্রানজেকশন</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTransetion;