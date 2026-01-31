import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

    const linkClass = (path, exact = false) =>
      `px-3 py-2 rounded-lg text-sm font-medium transition ${
        exact
          ? pathname === path
            ? "bg-indigo-500/20 text-indigo-300"
            : "text-zinc-300 hover:bg-slate-800 hover:text-white"
          : pathname.startsWith(path)
            ? "bg-indigo-500/20 text-indigo-300"
            : "text-zinc-300 hover:bg-slate-800 hover:text-white"
      }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo / Title */}
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-white"
          >
            Bubble<span className="text-indigo-400">Up</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-2">
            <Link to="/" className={linkClass("/", true)}>
              Pagina Principală
            </Link>
            <Link to="/simulate/bubble" className={linkClass("/simulate")}>
              Simulări
            </Link>
            <Link to="/code/bubble" className={linkClass("/code")}>
              Cod
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}