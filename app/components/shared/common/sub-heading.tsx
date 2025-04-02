import React from "react";

interface Props {
  text: string;
  styles?: string; // If you want to pass additional styles
}

const SubHeading: React.FC<Props> = ({ text, styles }) => {
  return (
    <h3
      className={`text-secondary font-[300] text-center  5xl:text-lg xl:text-base text-sm lg:leading-[20px] 5xl:leading-[24px] ${styles}`}
    >
      {text}
    </h3>
  );
};

export default SubHeading;
