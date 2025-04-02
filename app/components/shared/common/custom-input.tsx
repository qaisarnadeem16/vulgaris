"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

type CustomInputProps = {
  label?: any;
  style?: string;
  inputStyle?: string;
  value?: string;
  inputType: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  error?: string | null | false;
  description?: string;
  icon?: StaticImport;
  className?: string;
};

const CustomInput = (props: CustomInputProps) => {
  const {
    label,
    inputType,
    placeholder,
    icon,
    name,
    style,
    inputStyle,
    error,
    onChange,
    onBlur,
    value,
    description,
    className,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputClass = `text-secondary text-sm bg-[#434242] border ${error ? "border-error" : "border-transparent"
    }  py-3 focus:outline-none block w-full px-2.5 `;

  const containerClass = `relative bg-transparent ${error ? "pb-6" : ""}`;

  return (
    <div className={`flex flex-col w-full ${style} ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm sm:text-base font-normal text-[#F9F6EE]"
        >
          {label}
        </label>
      )}
      <div className={containerClass}>
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Image src={icon} alt="" />
          </div>
        )}
        <div className={`relative flex ${inputClass}  ${inputStyle}`}>
          <input
            type={inputType === "password" && showPassword ? "text" : inputType}
            placeholder={placeholder}
            name={name}
            id={name}
            value={value}
            className="w-full bg-transparent focus:outline-none focus:border-none"
            onChange={onChange}
            onBlur={onBlur}
          />
          {inputType === "password" && (
            <div
              className="flex items-center justify-center max-w-10"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <IoIosEyeOff size={20} />
              ) : (
                <IoIosEye size={20} />
              )}
            </div>
          )}
        </div>
        {error && (
          <span className="absolute text-xs text-error mt-1">{error}</span>
        )}

      </div>
    </div>
  );
};

export default CustomInput;
