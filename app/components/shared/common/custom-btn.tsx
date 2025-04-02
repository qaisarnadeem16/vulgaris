"use client";
import { Loader2 } from "lucide-react";
import React from "react";

type ButtonProps = {
  label: string;
  loadingLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
      | undefined
  ) => void;
  style?: string;
  icon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  label = "Button", // Default label
  onClick,
  style = "", // Default empty style
  type = "button", // Default button type
  loadingLabel = "Loading...", // Default loading label
  disabled = false, // Default disabled state
  loading = false, // Default loading state
  icon,
}) => {
  return (
    <div className="my-2">
      <button
        className={`py-2 5xl:py-3 cursor-pointer md:px-7 5xl:h-[64px] border border-white lg:h-[50px] h-[40px] px-5 xl:text-lg lg:text-base text-base   min-w-fit justify-center font-[300] text-white  flex items-center hover:scale-105 duration-300 transition-all ${disabled ? "bg-opacity-50 cursor-not-allowed" : ""
          } ${style}`}
        onClick={!disabled && !loading ? onClick : undefined}
        disabled={disabled}
        type={type}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-8 w-8 animate-spin" />
            <span>{loadingLabel}</span>{" "}
          </>
        ) : (
          <>
            {label}
          </>
        )}
      </button>
    </div>
  );
};

export default Button;
