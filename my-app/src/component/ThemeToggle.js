import React, { useEffect, useState } from "react";
import { applyTheme, getInitialTheme, toggleTheme } from "./theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme((current) => toggleTheme(current));
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="
        rounded-xl border px-3 py-2 text-sm font-semibold shadow-sm transition
        border-slate-300 bg-white text-slate-800 hover:bg-slate-100
        dark:border-slate-700 dark:bg-slate-900 dark:text-zinc-100 dark:hover:bg-slate-800
      "
      title="Schimbă tema"
    >
      {isDark ? "☀️ Luminos" : "🌙 Întunecat"}
    </button>
  );
}