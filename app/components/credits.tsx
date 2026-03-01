import React from "react";

interface CreditsProps {
  name?: string;
  link?: string;
  className?: string;
}

export const Credits: React.FC<CreditsProps> = ({
  name = "Ataídes",
  link = "https://ataidesdev.com.br",
  className = "",
}) => {
  return (
    <div className={`fixed bottom-0 right-18 m-4 ${className} group`}>
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
        Desenvolvido por {name}
      </div>

      {/* Logo */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <img src="/assets/Logo_Dev.png" alt="logo dev" className="w-12 h-12" />
      </a>
    </div>
  );
};