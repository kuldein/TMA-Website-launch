"use client";

interface Props {
  variant?: "light" | "dark";
  className?: string;
  height?: number;
}

export default function TMALogo({ variant = "light", className = "", height = 40 }: Props) {
  const color = variant === "light" ? "#ffffff" : "#0a0a0a";

  return (
    <svg
      viewBox="0 0 340 80"
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="The Modesty Argument"
    >
      {/* THE MODESTY */}
      <text
        x="0"
        y="34"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontWeight="300"
        fontSize="30"
        letterSpacing="1"
        fill={color}
      >
        THE MODESTY
      </text>
      {/* ARGUMENT */}
      <text
        x="0"
        y="68"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontWeight="300"
        fontSize="30"
        letterSpacing="1"
        fill={color}
      >
        ARGUMENT
      </text>

      {/* Symbol: horizontal line + diagonal slash (≠ style) */}
      {/* Horizontal line */}
      <line x1="242" y1="52" x2="294" y2="52" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Diagonal slash crossing the line */}
      <line x1="270" y1="30" x2="298" y2="75" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
