import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, isAdmin, loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 text-zinc-100 grid place-items-center">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-4">
          Se verifică accesul...
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}