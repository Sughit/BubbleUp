import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { user, isAdmin, loadingAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  if (!loadingAuth && user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const login = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const token = await cred.user.getIdTokenResult(true);

      if (token.claims.admin !== true) {
        await auth.signOut();
        setErr("Contul există, dar nu are drept de admin.");
        return;
      }

      navigate("/admin");
    } catch {
      setErr("Email sau parolă greșită.");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-zinc-50 px-4 text-slate-950 transition-colors dark:bg-slate-950 dark:text-zinc-100">
      <form
        onSubmit={login}
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/60"
      >
        <h1 className="text-2xl font-semibold text-slate-950 dark:text-zinc-100">
          Admin Login
        </h1>

        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
          Acces doar pentru conturile cu rol admin.
        </p>

        {err && (
          <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-100 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-200">
            {err}
          </div>
        )}

        <label className="mt-5 block text-sm text-slate-700 dark:text-zinc-300">
          Email
        </label>

        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400"
          required
        />

        <label className="mt-4 block text-sm text-slate-700 dark:text-zinc-300">
          Parolă
        </label>

        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400"
          required
        />

        <button className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-500">
          Conectare
        </button>
      </form>
    </div>
  );
}