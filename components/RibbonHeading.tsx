import type { ReactNode } from "react";

// Título tipo "cinta/banner" (navy con puntas), usado para Ceremonia/Celebración.
export default function RibbonHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block bg-navy px-9 py-2.5 font-script text-2xl text-white shadow-md ${className}`}
      style={{
        clipPath:
          "polygon(0% 0%, 100% 0%, 91% 50%, 100% 100%, 0% 100%, 9% 50%)",
      }}
    >
      {children}
    </span>
  );
}
