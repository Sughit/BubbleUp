// src/page/Simulation.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  DEFAULT_DATA,
  LABELS,
  ALLOWED_SLUGS,
  parseNumbers,
  getGenerator,
} from "../component/simulationHelper";

export default function Simulation() {
  const { algo } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState(DEFAULT_DATA);
  const [inputText, setInputText] = useState(DEFAULT_DATA.join(", "));
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speedMs, setSpeedMs] = useState(240);
  const [highlight, setHighlight] = useState({ a: -1, b: -1, range: [] });
  const [banner, setBanner] = useState("");

  const genRef = useRef(null);
  const timerRef = useRef(null);

  const title = useMemo(() => LABELS[algo?.toLowerCase()] || "Sorting", [algo]);
  const maxVal = useMemo(() => Math.max(10, ...values), [values]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };
  const stopAll = () => {
    resetTimer();
    genRef.current = null;
    setRunning(false);
    setPaused(false);
    setHighlight({ a: -1, b: -1, range: [] });
  };

  const stepAdvance = () => {
    const g = genRef.current;
    if (!g) return;
    const nxt = g.next();
    if (nxt.done) {
      const last = nxt.value;
      if (last && last.arr) {
        setValues(last.arr);
        setHighlight(last.hi || { a: -1, b: -1, range: [] });
      }
      stopAll();
      return;
    }
    const { arr, hi } = nxt.value;
    setValues(arr);
    setHighlight(hi || { a: -1, b: -1, range: [] });
  };

  const startRun = () => {
    stopAll();
    const data = parseNumbers(inputText);
    setValues(data);
    genRef.current = getGenerator(algo, data, setBanner);
    setRunning(true);
    setPaused(false);
    stepAdvance();
    timerRef.current = setInterval(stepAdvance, speedMs);
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
      setValues(data);
      genRef.current = getGenerator(algo, data, setBanner);
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
    const data = parseNumbers(inputText).slice().sort(() => Math.random() - 0.5);
    setValues(data);
    setInputText(data.join(", "));
    setHighlight({ a: -1, b: -1, range: [] });
  };

  const onReset = () => {
    stopAll();
    const data = parseNumbers(inputText);
    setValues(data);
    setHighlight({ a: -1, b: -1, range: [] });
  };

  useEffect(() => stopAll, []);
  useEffect(() => {
    if (!ALLOWED_SLUGS.includes((algo || "").toLowerCase())) {
      navigate("/simulate/bubble", { replace: true });
    } else {
      stopAll();
    }
  }, [algo]);

  /* ========= UI ========= */
  return (
    <div className="min-h-screen w-full bg-slate-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-8 space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm hover:bg-slate-800"
            >
              ← Înapoi
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
              <p className="text-sm text-zinc-400">
                Fiecare <span className="text-rose-400 font-semibold">număr</span> este o bară roșie,
                iar jos vezi marcajul subțire al <i>intervalului comparat</i>.
              </p>
              {banner && (
                <div className="mt-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-200 text-sm">
                  {banner}
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={startRun}
              className="px-3 py-2 rounded-xl bg-emerald-600 text-white hover:opacity-90"
            >
              Start
            </button>
            <button
              onClick={onPauseToggle}
              disabled={!running}
              className={`px-3 py-2 rounded-xl ${
                running ? "bg-amber-600 hover:opacity-90" : "bg-gray-700 opacity-60"
              } text-white`}
            >
              {paused ? "Continuă" : "Pauză"}
            </button>
            <button
              onClick={onStep}
              className="px-3 py-2 rounded-xl bg-sky-700 text-white hover:opacity-90"
            >
              Pasul Următor
            </button>
            <button
              onClick={onShuffle}
              className="px-3 py-2 rounded-xl bg-indigo-700 text-white hover:opacity-90"
            >
              Amestecă
            </button>
            <button
              onClick={onReset}
              className="px-3 py-2 rounded-xl bg-zinc-700 text-white hover:opacity-90"
            >
              Resetează
            </button>

            <div className="flex items-center gap-2 ml-2">
              <span className="text-xs text-gray-300">Viteză</span>
              <input
                type="range"
                min="60"
                max="800"
                step="20"
                value={speedMs}
                onChange={(e) => onSpeedChange(Number(e.target.value))}
                className="w-32"
                title="ms per frame (mai mic = mai rapid)"
              />
              <span className="text-xs text-gray-300 w-10 text-right">{speedMs}ms</span>
            </div>
          </div>
        </div>

        {/* Vizualizator */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
          <div className="relative h-72 w-full rounded-xl ring-1 ring-slate-800 overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(148,163,184,0.12) 0 1px, transparent 1px calc((100% / var(--ncols)) - 1px))",
                ["--ncols"]: values.length,
              }}
            />

            {/* ZONA BARE PRINCIPALE */}
            <div className="absolute inset-x-3 top-3 bottom-16 flex items-stretch gap-1 md:gap-2">
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
                const bg = (isA || isB || inRange) ? strong : base;

                return (
                  <div key={idx} className="flex-1 h-full flex flex-col justify-end items-center">
                    <div
                      className="w-full rounded-t-lg transition-all duration-150 shadow-sm"
                      style={{ height: `${h}%`, backgroundColor: bg }}
                      title={`a[${idx}] = ${v}`}
                    />
                  </div>
                );
              })}
            </div>
            {/* BANDA INFERIOARĂ: marcaj comparat / range */}
            <div className="absolute left-3 right-3 bottom-3 h-12">
              {/* Banda roșie */}
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
                    <div key={idx} className="flex-1 flex items-end">
                      <div
                        className={`w-full rounded ${active ? "h-2" : "h-[3px]"}`}
                        style={{
                          backgroundColor: active ? "rgba(239,68,68,0.9)" : "rgba(239,68,68,0.3)",
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Index-uri */}
              <div className="mt-2 flex h-6 items-center justify-between text-sm text-zinc-300 font-mono pointer-events-none select-none">
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
          </div>

          {/* Vector live */}
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-400">Vector:</span>
            <code className="text-sm bg-slate-950/60 px-2 py-1 rounded-lg border border-slate-800">
              [{values.join(", ")}]
            </code>
          </div>
        </div>

        {/* Navigare rapidă */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {ALLOWED_SLUGS.map((slug) => (
            <Link
              key={slug}
              to={`/simulate/${slug}`}
              className={`text-xs rounded-xl border px-2.5 py-1.5 text-center ${
                (algo || "").toLowerCase() === slug
                  ? "border-indigo-400 bg-indigo-500/20 text-indigo-200"
                  : "border-slate-800 bg-slate-900/40 text-zinc-300 hover:bg-slate-800/60"
              }`}
            >
              {LABELS[slug]}
            </Link>
          ))}
        </div>

        {/* Input jos */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-6 space-y-2">
          <label className="text-sm text-gray-300">Numere (virgulă sau spațiu)</label>
          <textarea
            className="w-full h-28 rounded-xl bg-slate-950/60 border border-slate-800 p-3 font-mono resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ex: 8, 6, 4, 9, 5, 2, 7, 3"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const parsed = parseNumbers(inputText);
                stopAll();
                setValues(parsed);
              }}
              className="px-3 py-2 rounded-xl bg-emerald-700 text-white hover:opacity-90"
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
                setValues(rnd);
              }}
              className="px-3 py-2 rounded-xl bg-purple-700 text-white hover:opacity-90"
            >
              Generează aleator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
