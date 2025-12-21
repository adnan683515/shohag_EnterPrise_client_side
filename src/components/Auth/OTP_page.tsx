import { useRef, useState } from "react";
import Button from "../../shared/Button";

const OTP_page = () => {
    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return; // only numbers

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // move to next input
        if (value && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const finalOtp = otp.join("");

        if (finalOtp.length !== 4) {
            alert("Please enter 4 digit OTP");
            return;
        }

        console.log("OTP:", finalOtp);
        // 👉 API call: verify OTP
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#025964] to-[#013a3f] px-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold text-center text-[#025964]">
                    OTP Verification
                </h2>
                <p className="text-center text-gray-500 mt-2">
                    Enter the 4 digit code sent to your email
                </p>

                {/* OTP BOXES */}
                <div className="flex justify-center gap-4 mt-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputsRef.current[index] = el; // ✅ void, no return
                            }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                                handleChange(e.target.value, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-14 h-14 text-center text-xl font-bold border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025964]"
                        />
                    ))}
                </div>

                <div className="mt-8">
                    <Button text="Verify OTP" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default OTP_page;
