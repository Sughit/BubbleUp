// src/page/CodeView.js
import React, { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { LABELS } from "../component/simulationHelper";
import { getCode, getLangsFor } from "../component/codeHelper";

export default function CodeView() {
  const { algo } = useParams();
  const navigate = useNavigate();
  const langs = useMemo(() => getLangsFor(algo), [algo]);
  const [lang, setLang] = useState(langs[0]?.key || "cpp");
  const label = LABELS[algo] || algo;
  const code = useMemo(() => getCode(algo, lang) || "// Fără cod disponibil.", [algo, lang]);

  const onCopy = async () => {
    try { await navigator.clipboard.writeText(code); } catch {}
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-6 space-y-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm hover:bg-slate-800">← Înapoi</button>
          <h1 className="text-2xl font-bold">{label} — Cod</h1>
          <Link to={`/simulate/${algo}`} className="ml-auto rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:opacity-90">▶️ Simulează</Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {langs.map((l) => (
            <button
              key={l.key}
              onClick={() => setLang(l.key)}
              className={`px-3 py-1.5 rounded-lg border ${lang===l.key ? "bg-slate-800 border-indigo-400 text-indigo-200" : "bg-slate-900/60 border-slate-800 text-zinc-300 hover:bg-slate-800/50"}`}
            >
              {l.label}
            </button>
          ))}
          <button onClick={onCopy} className="ml-auto rounded-lg bg-slate-800 px-3 py-1.5 text-sm hover:bg-slate-700">Copy</button>
        </div>

        <pre className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 overflow-auto text-sm whitespace-pre leading-6">
{code}
        </pre>
      </div>
    </div>
  );
}
