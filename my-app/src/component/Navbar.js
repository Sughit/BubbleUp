import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const [open, setOpen] = useState(false);

  const isActive = (path, exact = false) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  const linkClass = (path, exact = false) =>
    [
      "block rounded-xl px-3 py-2 text-sm font-medium transition",
      isActive(path, exact)
        ? "bg-indigo-500/20 text-indigo-600 dark:text-indigo-300"
        : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-zinc-300 dark:hover:bg-slate-800 dark:hover:text-white",
    ].join(" ");

  const closeMenu = () => setOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMenu();
      navigate("/");
    } catch {
      alert("Nu s-a putut face logout.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/95">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between gap-3">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white"
          >
            Bubble<span className="text-indigo-500 dark:text-indigo-400">Up</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden items-center gap-2 md:flex">
            <Link to="/" className={linkClass("/", true)}>
              Pagina Principală
            </Link>

            <Link to="/simulate/bubble" className={linkClass("/simulate")}>
              Simulări
            </Link>

            <Link to="/code/bubble" className={linkClass("/code")}>
              Cod
            </Link>

            <Link to="/tests" className={linkClass("/tests")}>
              Teste
            </Link>

            <Link to="/theory" className={linkClass("/theory")}>
              Teorie
            </Link>

            <Link to="/compare" className={linkClass("/compare")}>
              Compară
            </Link>

            <Link to="/about" className={linkClass("/about")}>
              Despre
            </Link>

            {user && isAdmin && (
              <>
                <Link to="/admin" className={linkClass("/admin")}>
                  Admin
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-500/20 dark:text-rose-200"
                >
                  Logout
                </button>
              </>
            )}

            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/70 dark:text-zinc-200 dark:hover:bg-slate-800"
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              aria-expanded={open}
            >
              {open ? (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="pb-4 md:hidden">
            <div className="space-y-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900/80">
              <Link to="/" onClick={closeMenu} className={linkClass("/", true)}>
                Pagina Principală
              </Link>

              <Link
                to="/simulate/bubble"
                onClick={closeMenu}
                className={linkClass("/simulate")}
              >
                Simulări
              </Link>

              <Link
                to="/code/bubble"
                onClick={closeMenu}
                className={linkClass("/code")}
              >
                Cod
              </Link>

              <Link
                to="/tests"
                onClick={closeMenu}
                className={linkClass("/tests")}
              >
                Teste
              </Link>

              <Link
                to="/theory"
                onClick={closeMenu}
                className={linkClass("/theory")}
              >
                Teorie
              </Link>

              <Link 
                to="/compare" 
                onClick={closeMenu}
                className={linkClass("/compare")}
              >
                Compară
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className={linkClass("/about")}
              >
                Despre
              </Link>

              {user && isAdmin && (
                <>
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className={linkClass("/admin")}
                  >
                    Admin
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-left text-sm font-medium text-rose-700 transition hover:bg-rose-500/20 dark:text-rose-200"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}