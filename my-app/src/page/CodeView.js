// src/page/CodeView.js
import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { LABELS } from "../component/simulationHelper";
import { getCode, getLangsFor } from "../component/codeHelper";

// Prism-based highlighter
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";

SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("python", python);

const langToPrism = { cpp: "cpp", java: "java", py: "python" };

export default function CodeView() {
  const { algo } = useParams();
  const navigate = useNavigate();
  const langs = useMemo(() => getLangsFor(algo), [algo]);
  const [lang, setLang] = useState(langs[0]?.key || "cpp");
  const label = LABELS[algo] || algo;
  const code = useMemo(() => getCode(algo, lang) || "// Fără cod disponibil.", [algo, lang]);

  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  useEffect(() => {
    if (!langs.find(l => l.key === lang)) setLang(langs[0]?.key || "cpp");
  }, [algo]);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-6 space-y-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm hover:bg-slate-800">← Înapoi</button>
          <h1 className="text-2xl font-bold">{label} — Cod</h1>
          <Link to={`/simulate/${algo}`} className="ml-auto rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:opacity-90">▶️ Simulează</Link>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {langs.map((l) => (
            <button
              key={l.key}
              onClick={() => setLang(l.key)}
              className={`px-3 py-1.5 rounded-lg border ${lang===l.key ? "bg-slate-800 border-indigo-400 text-indigo-200" : "bg-slate-900/60 border-slate-800 text-zinc-300 hover:bg-slate-800/50"}`}
            >
              {l.label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <button onClick={onCopy} className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm hover:bg-slate-700">
              {copied ? "Copiat" : "Copiază"}
            </button>
            <a
              download={`${algo}-${lang}.txt`}
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(code)}`}
              className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-1.5 text-sm hover:bg-slate-800"
            >
              Descarcă
            </a>
          </div>
        </div>

        {/* Code block with syntax highlight + line numbers */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 font-mono text-zinc-300">{algo}.{lang}</span>
            </div>
            <span className="font-mono">{langToPrism[lang]}</span>
          </div>

          <SyntaxHighlighter
            language={langToPrism[lang]}
            style={oneDark}
            showLineNumbers
            wrapLongLines
            customStyle={{ margin: 0, padding: "1rem 1rem 1.25rem", background: "transparent", fontSize: "0.9rem", lineHeight: 1.6 }}
            lineNumberStyle={{ opacity: 0.45, marginRight: "0.75rem" }}
          >
            {code}
          </SyntaxHighlighter>
        </div>

        <p className="text-xs text-zinc-400">Hint: poți selecta limbajul, copia sau descărca direct codul.</p>
      </div>
    </div>
  );
}
