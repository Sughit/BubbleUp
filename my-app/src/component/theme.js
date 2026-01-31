const THEME_KEY = "theme"; // "dark" | "light"

export function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return "dark"; // default: dark (cum ai acum)
}

export function applyTheme(theme) {
  const root = document.documentElement; // <html>
  if (theme === "light") root.classList.remove("dark");
  else root.classList.add("dark");
  localStorage.setItem(THEME_KEY, theme);
}

export function toggleTheme(current) {
  return current === "dark" ? "light" : "dark";
}