// src/page/CodeView.js
import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { LABELS, ALLOWED_SLUGS } from "../component/simulationHelper";
import { getCode, getLangsFor } from "../component/codeHelper";

// Prism-based highlighter
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
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
  const code = useMemo(
    () => getCode(algo, lang) || "// Fără cod disponibil.",
    [algo, lang]
  );

  const [copied, setCopied] = useState(false);

  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  useEffect(() => {
    if (!langs.find((l) => l.key === lang)) {
      setLang(langs[0]?.key || "cpp");
    }
  }, [algo, langs, lang]);

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-6">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-fit rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/70 dark:text-zinc-200 dark:hover:bg-slate-800"
          >
            ← Înapoi
          </button>

          <h1 className="text-2xl font-bold text-slate-950 dark:text-zinc-100">
            {label} — Cod
          </h1>

          <Link
            to={`/simulate/${algo}`}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm text-white transition hover:bg-indigo-500 sm:ml-auto"
          >
            Simulează
          </Link>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/40">
          {langs.map((l) => (
            <button
              key={l.key}
              onClick={() => setLang(l.key)}
              className={[
                "rounded-lg border px-3 py-1.5 text-sm transition",
                lang === l.key
                  ? "border-indigo-500 bg-indigo-100 text-indigo-700 dark:border-indigo-400 dark:bg-slate-800 dark:text-indigo-200"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-zinc-300 dark:hover:bg-slate-800/50",
              ].join(" ")}
            >
              {l.label}
            </button>
          ))}

          <div className="flex w-full items-center gap-2 sm:ml-auto sm:w-auto">
            <button
              onClick={onCopy}
              className="flex-1 rounded-lg border border-slate-300 bg-slate-100 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-200 sm:flex-none dark:border-slate-700 dark:bg-slate-800 dark:text-zinc-100 dark:hover:bg-slate-700"
            >
              {copied ? "Copiat" : "Copiază"}
            </button>

            <a
              download={`${algo}-${lang}.txt`}
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(code)}`}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-center text-sm text-slate-700 transition hover:bg-slate-100 sm:flex-none dark:border-slate-800 dark:bg-slate-900/70 dark:text-zinc-200 dark:hover:bg-slate-800"
            >
              Descarcă
            </a>
          </div>
        </div>

        {/* Code block with syntax highlight + line numbers */}
        <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-2 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 font-mono text-slate-700 dark:text-zinc-300">
                {algo}.{lang}
              </span>
            </div>

            <span className="font-mono">{langToPrism[lang]}</span>
          </div>

          <SyntaxHighlighter
            language={langToPrism[lang]}
            style={isDark ? oneDark : oneLight}
            showLineNumbers
            wrapLongLines
            customStyle={{
              margin: 0,
              padding: "1rem 1rem 1.25rem",
              background: "transparent",
              fontSize: "0.9rem",
              lineHeight: 1.6,
            }}
            lineNumberStyle={{
              opacity: 0.45,
              marginRight: "0.75rem",
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>

        {/* Navigare rapidă */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {ALLOWED_SLUGS.map((s) => (
            <Link
              key={s}
              to={`/code/${s}`}
              className={[
                "rounded-xl border px-2.5 py-1.5 text-center text-xs transition",
                algo === s
                  ? "border-indigo-500 bg-indigo-100 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-indigo-200"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/40 dark:text-zinc-300 dark:hover:bg-slate-800/60",
              ].join(" ")}
            >
              {LABELS[s]}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}