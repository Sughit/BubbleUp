import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ALLOWED_SLUGS,
  LABELS,
  DEFAULT_DATA,
  parseNumbers,
  getGenerator,
} from "../component/simulationHelper";

const CATEGORY_LABELS = {
  simple: "Sortare simplă",
  efficient: "Sortare eficientă",
  linear: "Sortare liniară",
  special: "Sortare specială",
  structures: "Structuri speciale",
};

const ALGORITHM_INFO = {
  bubble: {
    category: "simple",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    memory: "O(1)",
    stable: true,
    inPlace: true,
    description:
      "Compară elemente vecine și le interschimbă dacă sunt în ordine greșită.",
  },
  selection: {
    category: "simple",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    memory: "O(1)",
    stable: false,
    inPlace: true,
    description:
      "Caută minimul din partea nesortată și îl mută pe poziția corectă.",
  },
  insertion: {
    category: "simple",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    memory: "O(1)",
    stable: true,
    inPlace: true,
    description:
      "Inserează fiecare element în poziția potrivită din partea deja sortată.",
  },
  gnome: {
    category: "simple",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    memory: "O(1)",
    stable: true,
    inPlace: true,
    description:
      "Se deplasează înainte și înapoi, reparând inversiunile locale.",
  },
  cocktail: {
    category: "simple",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    memory: "O(1)",
    stable: true,
    inPlace: true,
    description:
      "Variantă bidirecțională de Bubble Sort, parcurgând vectorul în ambele sensuri.",
  },
  oddeven: {
    category: "simple",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    memory: "O(1)",
    stable: true,
    inPlace: true,
    description:
      "Compară alternativ perechi impare și pare până când vectorul devine sortat.",
  },
  shell: {
    category: "efficient",
    best: "O(n log² n)",
    average: "O(n√n)",
    worst: "O(n²)",
    memory: "O(1)",
    stable: false,
    inPlace: true,
    description:
      "Generalizează Insertion Sort folosind distanțe între elemente, numite gap-uri.",
  },
  comb: {
    category: "special",
    best: "O(n log n)",
    average: "≈ O(n¹·³)",
    worst: "O(n²)",
    memory: "O(1)",
    stable: false,
    inPlace: true,
    description:
      "Îmbunătățește Bubble Sort prin comparații la distanțe mai mari.",
  },
  merge: {
    category: "efficient",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    memory: "O(n)",
    stable: true,
    inPlace: false,
    description:
      "Împarte vectorul în jumătăți și interclasează secvențele sortate.",
  },
  quick: {
    category: "efficient",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    memory: "O(log n)",
    stable: false,
    inPlace: true,
    description:
      "Alege un pivot și împarte vectorul în elemente mai mici și mai mari decât pivotul.",
  },
  heap: {
    category: "efficient",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    memory: "O(1)",
    stable: false,
    inPlace: true,
    description:
      "Folosește o structură de tip heap pentru a extrage repetat maximul.",
  },
  counting: {
    category: "linear",
    best: "O(n + k)",
    average: "O(n + k)",
    worst: "O(n + k)",
    memory: "O(k)",
    stable: true,
    inPlace: false,
    description:
      "Numără aparițiile valorilor și reconstruiește vectorul sortat.",
  },
  radix: {
    category: "linear",
    best: "O(n · d)",
    average: "O(n · d)",
    worst: "O(n · d)",
    memory: "O(n + k)",
    stable: true,
    inPlace: false,
    description:
      "Sortează numerele pe cifre, folosind de obicei Counting Sort ca subprocedură.",
  },
  bucket: {
    category: "linear",
    best: "O(n)",
    average: "O(n)",
    worst: "O(n²)",
    memory: "O(n + k)",
    stable: true,
    inPlace: false,
    description:
      "Distribuie elementele în găleți, sortează fiecare găleată și concatenează rezultatele.",
  },
  pigeonhole: {
    category: "linear",
    best: "O(n + k)",
    average: "O(n + k)",
    worst: "O(n + k)",
    memory: "O(k)",
    stable: true,
    inPlace: false,
    description:
      "Folosește poziții directe pentru valori dintr-un interval cunoscut.",
  },
  stooge: {
    category: "special",
    best: "O(n²·⁷)",
    average: "O(n²·⁷)",
    worst: "O(n²·⁷)",
    memory: "O(log n)",
    stable: false,
    inPlace: true,
    description:
      "Algoritm recursiv exotic, util mai mult pentru demonstrații decât pentru practică.",
  },
  intro: {
    category: "efficient",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    memory: "O(log n)",
    stable: false,
    inPlace: true,
    description:
      "Combină Quick Sort, Heap Sort și Insertion Sort pentru performanță robustă.",
  },
  tim: {
    category: "efficient",
    best: "O(n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    memory: "O(n)",
    stable: true,
    inPlace: false,
    description:
      "Algoritm hibrid folosit în Python și Java pentru sortări reale.",
  },
  flash: {
    category: "special",
    best: "O(n)",
    average: "O(n)",
    worst: "O(n²)",
    memory: "O(n)",
    stable: false,
    inPlace: true,
    description:
      "Algoritm distribuțional rapid pentru date cu distribuție favorabilă.",
  },
  bitonic: {
    category: "special",
    best: "O(n log² n)",
    average: "O(n log² n)",
    worst: "O(n log² n)",
    memory: "O(n)",
    stable: false,
    inPlace: false,
    description:
      "Sorting network, potrivit pentru execuții paralele sau pe GPU.",
  },
  oddevenmerge: {
    category: "special",
    best: "O(n log² n)",
    average: "O(n log² n)",
    worst: "O(n log² n)",
    memory: "O(n)",
    stable: false,
    inPlace: false,
    description:
      "Algoritm de tip sorting network bazat pe interclasare odd-even.",
  },
};

function isComparisonStep(stepKey) {
  return ["compare", "compare_pivot", "heapify_compare"].includes(stepKey);
}

function isSwapStep(stepKey) {
  return ["swap", "extract_swap", "heapify_swap", "partition"].includes(stepKey);
}

function analyzeAlgorithm(slug, input) {
  const data = input.slice();
  const gen = getGenerator(slug, data, () => {});

  let steps = 0;
  let comparisons = 0;
  let swaps = 0;
  let finalArray = data;

  while (true) {
    const next = gen.next();

    if (next.done) break;

    const frame = next.value;
    const stepKey = frame?.stepKey || "";

    steps += 1;
    comparisons += isComparisonStep(stepKey) ? 1 : 0;
    swaps += isSwapStep(stepKey) ? 1 : 0;

    if (Array.isArray(frame?.arr)) {
      finalArray = frame.arr.slice();
    }
  }

  return {
    steps,
    comparisons,
    swaps,
    finalArray,
  };
}

function Badge({ children, variant = "default" }) {
  const variants = {
    default:
      "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-950/60 dark:text-zinc-300",
    indigo:
      "border-indigo-500/30 bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200",
    green:
      "border-emerald-500/30 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
    rose:
      "border-rose-500/30 bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
    amber:
      "border-amber-500/30 bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function MetricCard({ label, value, winner }) {
  return (
    <div
      className={[
        "rounded-2xl border p-4 transition",
        winner
          ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10"
          : "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40",
      ].join(" ")}
    >
      <div className="text-xs text-slate-500 dark:text-zinc-400">{label}</div>
      <div className="mt-1 font-mono text-lg font-semibold text-slate-950 dark:text-zinc-100">
        {value}
      </div>
    </div>
  );
}

function AlgorithmPanel({ slug, result, opponentResult }) {
  const info = ALGORITHM_INFO[slug] || {};
  const label = LABELS[slug] || slug;

  const stepsWinner = result.steps < opponentResult.steps;
  const comparisonsWinner = result.comparisons < opponentResult.comparisons;
  const swapsWinner = result.swaps < opponentResult.swaps;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-950 dark:text-zinc-100">
            {label}
          </h2>

        <div className="shrink-0">
          <Badge variant="indigo">
            {CATEGORY_LABELS[info.category] || "Categorie"}
          </Badge>
        </div>
      </div>

        <p className="mt-3 min-h-[44px] text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
            {info.description || "Descriere indisponibilă."}
        </p>
        </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <MetricCard label="Pași animați" value={result.steps} winner={stepsWinner} />
        <MetricCard
          label="Comparații"
          value={result.comparisons}
          winner={comparisonsWinner}
        />
        <MetricCard
          label="Interschimbări"
          value={result.swaps}
          winner={swapsWinner}
        />
        <MetricCard label="Memorie" value={info.memory || "—"} />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/40">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Best</div>
          <div className="mt-1 font-mono text-slate-950 dark:text-zinc-100">
            {info.best || "—"}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/40">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Average</div>
          <div className="mt-1 font-mono text-slate-950 dark:text-zinc-100">
            {info.average || "—"}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/40">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Worst</div>
          <div className="mt-1 font-mono text-slate-950 dark:text-zinc-100">
            {info.worst || "—"}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant={info.stable ? "green" : "rose"}>
          {info.stable ? "Stabil" : "Instabil"}
        </Badge>

        <Badge variant={info.inPlace ? "green" : "amber"}>
          {info.inPlace ? "In-place" : "Memorie auxiliară"}
        </Badge>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/simulate/${slug}`}
          className="flex-1 rounded-xl bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Simulează
        </Link>

        <Link
          to={`/code/${slug}`}
          className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-zinc-200 dark:hover:bg-slate-800"
        >
          Cod
        </Link>
      </div>
    </div>
  );
}

function getVerdict(leftSlug, rightSlug, leftResult, rightResult) {
  const leftLabel = LABELS[leftSlug] || leftSlug;
  const rightLabel = LABELS[rightSlug] || rightSlug;

  const leftScore =
    leftResult.steps + leftResult.comparisons * 2 + leftResult.swaps * 3;

  const rightScore =
    rightResult.steps + rightResult.comparisons * 2 + rightResult.swaps * 3;

  if (leftScore < rightScore) {
    return {
      winner: leftLabel,
      text: `${leftLabel} a avut un comportament mai bun pe vectorul ales, având un cost practic mai mic după numărul de pași, comparații și interschimbări.`,
    };
  }

  if (rightScore < leftScore) {
    return {
      winner: rightLabel,
      text: `${rightLabel} a avut un comportament mai bun pe vectorul ales, având un cost practic mai mic după numărul de pași, comparații și interschimbări.`,
    };
  }

  return {
    winner: "Egalitate",
    text: "Pe vectorul ales, cei doi algoritmi au avut un comportament foarte apropiat.",
  };
}

export default function Compare() {
  const [leftAlgo, setLeftAlgo] = useState("bubble");
  const [rightAlgo, setRightAlgo] = useState("merge");
  const [inputText, setInputText] = useState(DEFAULT_DATA.join(", "));

  const inputArray = useMemo(() => parseNumbers(inputText), [inputText]);

  const leftResult = useMemo(
    () => analyzeAlgorithm(leftAlgo, inputArray),
    [leftAlgo, inputArray]
  );

  const rightResult = useMemo(
    () => analyzeAlgorithm(rightAlgo, inputArray),
    [rightAlgo, inputArray]
  );

  const verdict = useMemo(
    () => getVerdict(leftAlgo, rightAlgo, leftResult, rightResult),
    [leftAlgo, rightAlgo, leftResult, rightResult]
  );

  const randomize = () => {
    const rnd = Array.from({ length: 10 }, () =>
      Math.floor(5 + Math.random() * 45)
    );

    setInputText(rnd.join(", "));
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <Badge variant="indigo">Analiză comparativă</Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-zinc-100">
            Compară doi algoritmi de sortare
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-zinc-400 md:text-base">
            Alege doi algoritmi și rulează-i pe același vector. Aplicația îți
            arată diferențele teoretice și comportamentul practic: pași,
            comparații, interschimbări, memorie și proprietăți importante.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm text-slate-700 dark:text-zinc-300">
                Primul algoritm
              </label>
              <select
                value={leftAlgo}
                onChange={(e) => setLeftAlgo(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-zinc-100 dark:focus:border-indigo-400"
              >
                {ALLOWED_SLUGS.map((slug) => (
                  <option key={slug} value={slug}>
                    {LABELS[slug]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-700 dark:text-zinc-300">
                Al doilea algoritm
              </label>
              <select
                value={rightAlgo}
                onChange={(e) => setRightAlgo(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-zinc-100 dark:focus:border-indigo-400"
              >
                {ALLOWED_SLUGS.map((slug) => (
                  <option key={slug} value={slug}>
                    {LABELS[slug]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm text-slate-700 dark:text-zinc-300">
              Vector testat
            </label>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="mt-1 h-24 w-full resize-y rounded-xl border border-slate-300 bg-white p-3 font-mono text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400"
              placeholder="Ex: 8, 6, 4, 9, 5, 2, 7, 3"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={randomize}
                className="rounded-xl bg-purple-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-600"
              >
                Generează vector aleator
              </button>

              <button
                type="button"
                onClick={() => setInputText(DEFAULT_DATA.join(", "))}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-zinc-200 dark:hover:bg-slate-800"
              >
                Vector implicit
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-indigo-300 bg-indigo-50 p-5 shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/10">
          <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-200">
            Verdict
          </div>

          <div className="mt-1 text-2xl font-bold text-slate-950 dark:text-zinc-100">
            {verdict.winner}
          </div>

          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
            {verdict.text}
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <AlgorithmPanel
            slug={leftAlgo}
            result={leftResult}
            opponentResult={rightResult}
          />

          <AlgorithmPanel
            slug={rightAlgo}
            result={rightResult}
            opponentResult={leftResult}
          />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            Observație importantă
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
            Rezultatul practic depinde de vectorul ales. Un algoritm poate fi
            mai bun pe date aproape sortate, dar mai slab pe date complet
            dezordonate. De aceea, aplicația compară atât proprietățile teoretice,
            cât și comportamentul pe date concrete.
          </p>
        </section>
      </div>
    </div>
  );
}