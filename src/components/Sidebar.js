"use client";
import { useState } from "react";
import { Zap, Box, Layers, ChevronLeft } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedMode, setSelectedMode] = useState("REST");

  const modes = [
    {
      name: "REST",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      name: "GraphQL",
      icon: <Box className="w-6 h-6" />,
    },
    {
      name: "Real-time",
      icon: <Layers className="w-6 h-6" />,
    },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-72" : "w-20"
      } bg-dark-200 h-full transition-all duration-300 ease-in-out relative`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-4 top-6 bg-dark-200 p-2 rounded-full shadow-md hover:bg-dark-300 transition-all duration-200 z-10"
      >
        <ChevronLeft
          className={`w-4 h-4 text-white transform transition-transform duration-300 ${
            !isOpen && "rotate-180"
          }`}
        />
      </button>

      <div className="pt-6">
        <div
          className={`px-4 space-y-2 ${
            !isOpen && "flex flex-col items-center"
          }`}
        >
          {modes.map((mode) => (
            <button
              key={mode.name}
              onClick={() => setSelectedMode(mode.name)}
              className={`
                w-full rounded-xl transition-all duration-200
                ${isOpen ? "px-4 py-3" : "p-3"}
                ${
                  selectedMode === mode.name
                    ? "bg-primary-600 text-white"
                    : "bg-dark-300 text-gray-300 hover:bg-primary-600/20"
                }
                flex ${isOpen ? "items-center" : "justify-center"}
              `}
            >
              <div className={isOpen ? "mr-3" : ""}>{mode.icon}</div>
              {isOpen && <span className="font-medium">{mode.name}</span>}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
