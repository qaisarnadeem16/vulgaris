import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string; // If you want to pass additional styles
}

const Heading: React.FC<Props> = ({ children, className }) => {
  return (
    <h1
      className={`md:text-[64px] font-alice text-3xl md:leading-[73px] text-center capitalize text-white   ${className}`}
    >
      {children}
    </h1>
  );
};

export default Heading;
