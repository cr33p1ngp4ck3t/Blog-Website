"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}
