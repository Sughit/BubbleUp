import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  DEFAULT_DATA,
  LABELS,
  ALLOWED_SLUGS,
  parseNumbers,
  getGenerator,
} from "../component/simulationHelper";

import {
  getCode,
  getLangsFor,
  getCodeLines,
  findHighlightRange,
} from "../component/codeHelper";

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getAuxMemoryEstimate(slug, values) {
  const n = values.length;
  const max = Math.max(...values, 0);
  const min = Math.min(...values, 0);
  const range = Math.max(1, max - min + 1);

  const numberBytes = 8;

  const map = {
    bubble: { label: "O(1)", bytes: 4 * numberBytes },
    selection: { label: "O(1)", bytes: 4 * numberBytes },
    insertion: { label: "O(1)", bytes: 4 * numberBytes },
    gnome: { label: "O(1)", bytes: 4 * numberBytes },
    cocktail: { label: "O(1)", bytes: 6 * numberBytes },
    oddeven: { label: "O(1)", bytes: 4 * numberBytes },
    shell: { label: "O(1)", bytes: 6 * numberBytes },
    comb: { label: "O(1)", bytes: 6 * numberBytes },
    quick: {
      label: "O(log n)",
      bytes: Math.max(1, Math.ceil(Math.log2(Math.max(2, n)))) * 2 * numberBytes,
    },
    heap: { label: "O(1)", bytes: 6 * numberBytes },
    merge: { label: "O(n)", bytes: n * numberBytes },
    tim: { label: "O(n)", bytes: n * numberBytes },
    counting: { label: "O(k)", bytes: (max + 1) * numberBytes },
    radix: { label: "O(n + 10)", bytes: (n + 10) * numberBytes },
    bucket: { label: "O(n + k)", bytes: (n + 10) * numberBytes },
    pigeonhole: { label: "O(range)", bytes: range * numberBytes },
    flash: { label: "O(n)", bytes: n * numberBytes },
    intro: {
      label: "O(log n)",
      bytes: Math.max(1, Math.ceil(Math.log2(Math.max(2, n)))) * 2 * numberBytes,
    },
    stooge: {
      label: "O(log n) recursiv",
      bytes: Math.max(1, Math.ceil(Math.log2(Math.max(2, n)))) * 3 * numberBytes,
    },
    bitonic: { label: "O(n)", bytes: n * numberBytes },
    oddevenmerge: { label: "O(n)", bytes: n * numberBytes },
  };

  return map[slug] || { label: "Estimare indisponibilă", bytes: 0 };
}

function isComparisonStep(stepKey) {
  return [
    "compare",
    "compare_pivot",
    "heapify_compare",
  ].includes(stepKey);
}

function isSwapStep(stepKey) {
  return [
    "swap",
    "extract_swap",
    "heapify_swap",
    "partition",
  ].includes(stepKey);
}

export default function Simulation() {
  const { algo } = useParams();
  const navigate = useNavigate();

  const slug = (algo || "").toLowerCase();

  const langs = useMemo(() => getLangsFor(slug), [slug]);
  const [lang, setLang] = useState(langs[0]?.key || "cpp");

  const SPEED_MIN = 60;
  const SPEED_MAX = 800;

  const [currentStepKey, setCurrentStepKey] = useState("init");
  const [currentRange, setCurrentRange] = useState({ from: 0, to: 0 });

  const [values, setValues] = useState(DEFAULT_DATA);
  const [inputText, setInputText] = useState(DEFAULT_DATA.join(", "));
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [speedMs, setSpeedMs] = useState(240);
  const [highlight, setHighlight] = useState({ a: -1, b: -1, range: [] });
  const [banner, setBanner] = useState("");

  const [stats, setStats] = useState({
    steps: 0,
    comparisons: 0,
    swaps: 0,
    auxMemoryLabel: "O(1)",
    auxMemoryBytes: 0,
    storageBytes: DEFAULT_DATA.length * 8,
  });

  const statsRef = useRef(stats);
  const genRef = useRef(null);
  const timerRef = useRef(null);

  const title = useMemo(() => LABELS[slug] || "Sorting", [slug]);
  const maxVal = useMemo(() => Math.max(10, ...values), [values]);

  const code = useMemo(
    () => getCode(slug, lang) || "// Fără cod disponibil.",
    [slug, lang]
  );

  const codeLines = useMemo(() => getCodeLines(slug, lang), [slug, lang]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const buildInitialStats = (data) => {
    const aux = getAuxMemoryEstimate(slug, data);

    return {
      steps: 0,
      comparisons: 0,
      swaps: 0,
      auxMemoryLabel: aux.label,
      auxMemoryBytes: aux.bytes,
      storageBytes: data.length * 8,
    };
  };

  const applyStats = (next) => {
    statsRef.current = next;
    setStats(next);
  };

  const stopAll = () => {
    resetTimer();
    genRef.current = null;
    setRunning(false);
    setPaused(false);
    setHighlight({ a: -1, b: -1, range: [] });
    setCurrentStepKey("init");
    setCurrentRange({ from: 0, to: 0 });
  };

  const finishRun = () => {
    resetTimer();
    genRef.current = null;
    setRunning(false);
    setPaused(false);
    setFinished(true);
    setHighlight({ a: -1, b: -1, range: [0, values.length - 1] });
    setCurrentStepKey("done");
  };

  const stepAdvance = () => {
    const g = genRef.current;
    if (!g) return;

    const nxt = g.next();

    if (nxt.done) {
      finishRun();
      return;
    }

    const { arr, hi, stepKey } = nxt.value;
    const sk = typeof stepKey === "string" ? stepKey : "init";

    setValues(arr);
    setHighlight(hi || { a: -1, b: -1, range: [] });
    setCurrentStepKey(sk);

    const range = findHighlightRange(code, slug, lang, sk);
    setCurrentRange(range);

    const nextStats = {
      ...statsRef.current,
      steps: statsRef.current.steps + 1,
      comparisons:
        statsRef.current.comparisons + (isComparisonStep(sk) ? 1 : 0),
      swaps: statsRef.current.swaps + (isSwapStep(sk) ? 1 : 0),
    };

    applyStats(nextStats);

    if (sk === "done") {
      setFinished(true);
      setRunning(false);
      setPaused(false);
      resetTimer();
      genRef.current = null;
    }
  };

  const startRun = () => {
    stopAll();

    const data = parseNumbers(inputText);
    const initialStats = buildInitialStats(data);

    setFinished(false);
    setValues(data);
    applyStats(initialStats);

    genRef.current = getGenerator(slug, data, setBanner);
    setRunning(true);
    setPaused(false);

    setTimeout(() => {
      stepAdvance();
      timerRef.current = setInterval(stepAdvance, speedMs);
    }, 0);
  };

  const onPauseToggle = () => {
    if (!running) return;

    if (paused) {
      setPaused(false);
      timerRef.current = setInterval(stepAdvance, speedMs);
    } else {
      setPaused(true);
      resetTimer();
    }
  };

  const onStep = () => {
    if (!running) {
      const data = parseNumbers(inputText);
      const initialStats = buildInitialStats(data);

      setFinished(false);
      setValues(data);
      applyStats(initialStats);

      genRef.current = getGenerator(slug, data, setBanner);
      setRunning(true);
      setPaused(true);
    }

    resetTimer();
    stepAdvance();
  };

  const onSpeedChange = (ms) => {
    setSpeedMs(ms);

    if (running && !paused) {
      resetTimer();
      timerRef.current = setInterval(stepAdvance, ms);
    }
  };

  const onShuffle = () => {
    stopAll();
    setFinished(false);

    const data = parseNumbers(inputText)
      .slice()
      .sort(() => Math.random() - 0.5);

    setValues(data);
    setInputText(data.join(", "));
    setHighlight({ a: -1, b: -1, range: [] });
    applyStats(buildInitialStats(data));
  };

  const onReset = () => {
    stopAll();
    setFinished(false);

    const data = parseNumbers(inputText);
    setValues(data);
    setHighlight({ a: -1, b: -1, range: [] });
    applyStats(buildInitialStats(data));
  };

  useEffect(() => stopAll, []);

  useEffect(() => {
    if (!ALLOWED_SLUGS.includes(slug)) {
      navigate("/simulate/bubble", { replace: true });
    } else {
      stopAll();
      setFinished(false);
      const data = parseNumbers(inputText);
      applyStats(buildInitialStats(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (!langs.find((l) => l.key === lang)) {
      setLang(langs[0]?.key || "cpp");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, langs.length]);

  useEffect(() => {
    const range = findHighlightRange(code, slug, lang, currentStepKey);
    setCurrentRange(range);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, lang]);

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-6 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => navigate(-1)}
              className="w-fit rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/70 dark:text-zinc-200 dark:hover:bg-slate-800"
            >
              ← Înapoi
            </button>

            <div>
              <h1 className="text-2xl font-bold text-slate-950 dark:text-zinc-100 md:text-3xl">
                {title}
              </h1>

              <p className="text-sm text-slate-600 dark:text-zinc-400">
                Fiecare{" "}
                <span className="font-semibold text-rose-600 dark:text-rose-400">
                  număr
                </span>{" "}
                este o bară roșie, iar jos vezi marcajul subțire al{" "}
                <i>intervalului comparat</i>.
              </p>

              {banner && (
                <div className="mt-2 rounded-lg border border-amber-500/30 bg-amber-100 px-3 py-2 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
                  {banner}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={startRun}
              className="rounded-xl bg-emerald-600 px-3 py-2 text-white transition hover:bg-emerald-500"
            >
              Start
            </button>

            <button
              onClick={onPauseToggle}
              disabled={!running}
              className={[
                "rounded-xl px-3 py-2 text-white transition",
                running
                  ? "bg-amber-600 hover:bg-amber-500"
                  : "cursor-not-allowed bg-slate-400 opacity-70 dark:bg-gray-700",
              ].join(" ")}
            >
              {paused ? "Continuă" : "Pauză"}
            </button>

            <button
              onClick={onStep}
              className="rounded-xl bg-sky-700 px-3 py-2 text-white transition hover:bg-sky-600"
            >
              Pasul Următor
            </button>

            <button
              onClick={onShuffle}
              className="rounded-xl bg-indigo-700 px-3 py-2 text-white transition hover:bg-indigo-600"
            >
              Amestecă
            </button>

            <button
              onClick={onReset}
              className="rounded-xl bg-zinc-700 px-3 py-2 text-white transition hover:bg-zinc-600"
            >
              Resetează
            </button>

            <div className="ml-0 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 md:ml-2">
              <span className="text-xs text-slate-600 dark:text-gray-300">
                Viteză
              </span>

              <input
                type="range"
                min="0"
                max="100"
                value={100 - Math.round(
                  ((speedMs - SPEED_MIN) / (SPEED_MAX - SPEED_MIN)) * 100
                )}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  const ms =
                    SPEED_MIN +
                    ((100 - v) / 100) * (SPEED_MAX - SPEED_MIN);
                  onSpeedChange(Math.round(ms));
                }}
                className="w-32 accent-indigo-600"
              />

              <span className="w-14 text-right text-xs text-slate-600 dark:text-gray-300">
                {Math.round(
                  ((SPEED_MAX - speedMs) / (SPEED_MAX - SPEED_MIN)) * 100
                )}
                %
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] md:col-span-2 md:p-6">
            <div className="relative min-h-[430px] w-full overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800 md:min-h-[460px]">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, rgba(148,163,184,0.18) 0 1px, transparent 1px calc((100% / var(--ncols)) - 1px))",
                  ["--ncols"]: values.length,
                }}
              />

              <div className="absolute inset-x-3 top-3 bottom-20 flex items-stretch gap-1 md:gap-2">
                {values.map((v, idx) => {
                  const h = Math.max(4, Math.round((v / maxVal) * 100));

                  const isA = idx === highlight.a;
                  const isB = idx === highlight.b;
                  const inRange =
                    highlight.range.length === 2 &&
                    idx >= highlight.range[0] &&
                    idx <= highlight.range[1];

                  const base = "#ef4444";
                  const strong = "#dc2626";
                  const bg = isA || isB || inRange ? strong : base;

                  return (
                    <div
                      key={idx}
                      className="flex h-full flex-1 flex-col items-center justify-end"
                    >
                      <div
                        className="w-full rounded-t-lg shadow-sm transition-all duration-150"
                        style={{ height: `${h}%`, backgroundColor: bg }}
                        title={`a[${idx}] = ${v}`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="absolute bottom-4 left-3 right-3 h-14">
                <div className="flex h-4 items-end gap-1 md:gap-2">
                  {values.map((_, idx) => {
                    const isA = idx === highlight.a;
                    const isB = idx === highlight.b;
                    const inRange =
                      highlight.range.length === 2 &&
                      idx >= highlight.range[0] &&
                      idx <= highlight.range[1];

                    const active = isA || isB || inRange;

                    return (
                      <div key={idx} className="flex flex-1 items-end">
                        <div
                          className={`w-full rounded ${active ? "h-2" : "h-[3px]"}`}
                          style={{
                            backgroundColor: active
                              ? "rgba(239,68,68,0.9)"
                              : "rgba(239,68,68,0.35)",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-2 flex h-6 items-center justify-between font-mono text-sm text-slate-500 pointer-events-none select-none dark:text-zinc-300">
                  {values.map((_, i) => (
                    <span
                      key={i}
                      className="text-center"
                      style={{ width: `${100 / values.length}%` }}
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>

              {finished && (
                <div className="absolute inset-0 grid place-items-center bg-white/70 p-4 backdrop-blur-sm dark:bg-slate-950/70">
                  <div className="w-full max-w-md rounded-2xl border border-indigo-300/60 bg-white/85 p-4 shadow-2xl dark:border-indigo-400/30 dark:bg-slate-900/85">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-bold text-slate-950 dark:text-zinc-100">
                          Simulare finalizată
                        </h2>
                        <p className="text-xs text-slate-600 dark:text-zinc-400">
                          Rezumat estimativ pentru {title}
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                        Gata
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                        <div className="text-xs text-slate-500 dark:text-zinc-400">
                          Pași animați
                        </div>
                        <div className="font-mono text-lg font-semibold text-slate-900 dark:text-zinc-100">
                          {stats.steps}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                        <div className="text-xs text-slate-500 dark:text-zinc-400">
                          Comparații
                        </div>
                        <div className="font-mono text-lg font-semibold text-slate-900 dark:text-zinc-100">
                          {stats.comparisons}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                        <div className="text-xs text-slate-500 dark:text-zinc-400">
                          Interschimbări
                        </div>
                        <div className="font-mono text-lg font-semibold text-slate-900 dark:text-zinc-100">
                          {stats.swaps}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                        <div className="text-xs text-slate-500 dark:text-zinc-400">
                          Vector
                        </div>
                        <div className="font-mono text-lg font-semibold text-slate-900 dark:text-zinc-100">
                          {formatBytes(stats.storageBytes)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-950/50">
                      <div className="text-xs text-slate-500 dark:text-zinc-400">
                        Memorie auxiliară estimată
                      </div>
                      <div className="mt-1 font-mono text-base font-semibold text-slate-900 dark:text-zinc-100">
                        {stats.auxMemoryLabel} · {formatBytes(stats.auxMemoryBytes)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFinished(false)}
                      className="mt-3 w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                    >
                      Închide rezumatul
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-gray-400">
                Vector:
              </span>

              <code className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950/60 dark:text-zinc-100">
                [{values.join(", ")}]
              </code>

              <span className="ml-auto font-mono text-xs text-slate-500 dark:text-zinc-400">
                step:{" "}
                <span className="text-indigo-600 dark:text-indigo-200">
                  {currentStepKey}
                </span>
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/60">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                Cod (highlight live)
              </span>

              <Link
                to={`/code/${slug}`}
                className="ml-auto rounded-lg bg-indigo-600 px-3 py-1.5 text-xs text-white transition hover:bg-indigo-500"
              >
                Vezi doar codul
              </Link>
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
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
            </div>

            <div className="max-h-[420px] overflow-x-auto overflow-y-auto rounded-xl border border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-950/60">
              <pre className="m-0 p-2 font-mono text-xs leading-5 whitespace-pre">
                {codeLines.map((line, idx) => {
                  const isActive =
                    idx >= currentRange.from && idx <= currentRange.to;

                  return (
                    <div
                      key={idx}
                      className={[
                        "grid grid-cols-[2.25rem,1fr] items-start rounded px-1",
                        isActive
                          ? "bg-indigo-100 ring-1 ring-indigo-300 dark:bg-indigo-500/20 dark:ring-indigo-400/40"
                          : "",
                      ].join(" ")}
                    >
                      <span className="select-none pr-2 text-right tabular-nums text-slate-400 dark:text-zinc-500">
                        {idx + 1}
                      </span>

                      <span
                        className={
                          isActive
                            ? "text-indigo-700 dark:text-indigo-100"
                            : "text-slate-800 dark:text-zinc-200"
                        }
                      >
                        {line || " "}
                      </span>
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {ALLOWED_SLUGS.map((s) => (
            <Link
              key={s}
              to={`/simulate/${s}`}
              className={[
                "rounded-xl border px-2.5 py-1.5 text-center text-xs transition",
                slug === s
                  ? "border-indigo-500 bg-indigo-100 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-indigo-200"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/40 dark:text-zinc-300 dark:hover:bg-slate-800/60",
              ].join(" ")}
            >
              {LABELS[s]}
            </Link>
          ))}
        </div>

        <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/60 md:p-6">
          <label className="text-sm text-slate-600 dark:text-gray-300">
            Numere (virgulă sau spațiu)
          </label>

          <textarea
            className="h-28 w-full resize-y rounded-xl border border-slate-300 bg-white p-3 font-mono text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400/40 dark:border-slate-800 dark:bg-slate-950/60 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ex: 8, 6, 4, 9, 5, 2, 7, 3"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const parsed = parseNumbers(inputText);
                stopAll();
                setFinished(false);
                setValues(parsed);
                applyStats(buildInitialStats(parsed));
              }}
              className="rounded-xl bg-emerald-700 px-3 py-2 text-white transition hover:bg-emerald-600"
            >
              Aplică vectorul
            </button>

            <button
              onClick={() => {
                const rnd = Array.from({ length: 10 }, () =>
                  Math.floor(5 + Math.random() * 45)
                );

                setInputText(rnd.join(", "));
                stopAll();
                setFinished(false);
                setValues(rnd);
                applyStats(buildInitialStats(rnd));
              }}
              className="rounded-xl bg-purple-700 px-3 py-2 text-white transition hover:bg-purple-600"
            >
              Generează aleator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}