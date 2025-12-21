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
        sm:text-base
        md:text-lg
        group
        ${className}
      `}
    >
   
      <span
        className="
          absolute
          top-0
          left-0
          h-full
          w-0
          
          bg-black
          transition-all
          duration-700
          group-hover:w-full
        "
      />
      <span className="relative z-10">
        {loading ? "Loading..." : text}
      </span>

      
    </button>
  );
};

export default Button;
