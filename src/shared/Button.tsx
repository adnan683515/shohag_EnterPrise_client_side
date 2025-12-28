import { Loader } from "lucide-react";
import React from "react";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  className = "",
}) => {

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative
        overflow-hidden
        w-full
        bg-[#025964]
        text-white
        font-semibold
        py-3
        rounded-xl
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        text-sm
        cursor-pointer
        sm:text-base
        md:text-lg

        ${className}
      `}
    >

      <div className="relative z-10">
        {loading ? <div className="flex justify-center items-center">
          <Loader className="text-black animate-spin" />
        </div> : text}
      </div>

      
    </button>
  );
};

export default Button;
