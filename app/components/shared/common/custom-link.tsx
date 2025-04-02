
import Link from "next/link";
import React from "react";

interface LinkWithIconProps {
  href: string;
  label?: string;
  iconStyles?: string;
  styles?: string; // Optional styles for the container

  style?: string;
}

const CustomLink: React.FC<LinkWithIconProps> = ({
  href,
  label,
  styles,

  style,
}) => {
  return (
    <Link
      href={href}
      className={`underline flex gap-2 items-center  lg:py-3 py-2 cursor-pointer hover:text-primary  duration-300 transition-all   ${styles}`}
    >
      <p className={`5xl:text-lg text-base font-medium text-primary ${style}`}>{label}</p>
      {/* <ArrowRight /> */}
    </Link>
  );
};

export default CustomLink;
