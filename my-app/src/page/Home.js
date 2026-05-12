import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────  CATEGORII  ───────────────────────── */
const CATEGORIES = [
  { id: "simple", label: "I. Sortări simple" },
  { id: "efficient", label: "II. Sortări eficiente" },
  { id: "linear", label: "III. Sortări liniare" },
  { id: "special", label: "IV. Sortări speciale" },
  { id: "structures", label: "V. Sortări pentru structuri speciale" },
];

/* ─────────────────────────  ALGORITMI  ───────────────────────── */
const ALGORITHMS = {
  /* I. SIMPLE */
  simple: [
    { name: "Bubble Sort", slug: "bubble", complexities:{best:<>O(n)</>,avg:<>O(n<b><sup>2</sup></b>)</>,worst:<>O(n<b><sup>2</sup></b>)</>}, stable:true, inPlace:true, notes:"Cu early-exit (flag), detectează dacă secvența e deja sortată." },
    { name: "Selection Sort", slug: "selection", complexities:{best:<>O(n<b><sup>2</sup></b>)</>,avg:<>O(n<b><sup>2</sup></b>)</>,worst:<>O(n<b><sup>2</sup></b>)</>}, stable:false, inPlace:true, notes:"Puține swap-uri (≤ n). Ineficient pentru liste mari." },
    { name: "Insertion Sort", slug: "insertion", complexities:{best:<>O(n)</>,avg:<>O(n<b><sup>2</sup></b>)</>,worst:<>O(n<b><sup>2</sup></b>)</>}, stable:true, inPlace:true, notes:"Excelent pe date aproape sortate sau loturi mici." },
    { name: "Gnome Sort", slug: "gnome", complexities:{best:<>O(n)</>,avg:<>O(n<b><sup>2</sup></b>)</>,worst:<>O(n<b><sup>2</sup></b>)</>}, stable:true, inPlace:true, notes:"Ca insertion, dar „dă înapoi” când găsește inversiuni." },
    { name: "Cocktail Shaker Sort", slug: "cocktail", complexities:{best:<>O(n)</>,avg:<>O(n<b><sup>2</sup></b>)</>,worst:<>O(n<b><sup>2</sup></b>)</>}, stable:true, inPlace:true, notes:"Bubble în ambele sensuri; eliberează capetele." },
    { name: "Odd–Even Sort", slug: "oddeven", complexities:{best:<>O(n)</>,avg:<>O(n<b><sup>2</sup></b>)</>,worst:<>O(n<b><sup>2</sup></b>)</>}, stable:true, inPlace:true, notes:"„Brick sort” – potrivește perechi impare/pare." },
  ],

  /* II. EFICIENTE */
  efficient: [
    { name: "Merge Sort", slug: "merge", complexities:{best:<>O(n·log n)</>,avg:<>O(n·log n)</>,worst:<>O(n·log n)</>}, stable:true, inPlace:false, notes:"Divide et impera; grozav la scară mare." },
    { name: "Quick Sort", slug: "quick", complexities:{best:<>O(n·log n)</>,avg:<>O(n·log n)</>,worst:<>O(n<b><sup>2</sup></b>)</>}, stable:false, inPlace:true, notes:"Rapid în practică; pivotul contează." },
    { name: "Heap Sort", slug: "heap", complexities:{best:<>O(n·log n)</>,avg:<>O(n·log n)</>,worst:<>O(n·log n)</>}, stable:false, inPlace:true, notes:"Previzibil și „in-place”." },
    { name: "Shell Sort", slug: "shell", complexities:{best:<>O(n·log² n)</>,avg:<>O(n·√n)</>,worst:<>O(n<b><sup>2</sup></b>)</>}, stable:false, inPlace:true, notes:"Depinde de secvența gap-urilor." },
    { name: "Intro Sort", slug: "intro", complexities:{best:<>O(n·log n)</>,avg:<>O(n·log n)</>,worst:<>O(n·log n)</>}, stable:false, inPlace:true, notes:"Hibrid Quick+Heap+Insertion (fallback pe Heap la adâncime mare)." },
    { name: "Tim Sort", slug: "tim", complexities:{best:<>O(n)</>,avg:<>O(n·log n)</>,worst:<>O(n·log n)</>}, stable:true, inPlace:false, notes:"Hibrid merge+insertion (Python/Java)." },
  ],

  /* III. LINIARE */
  linear: [
    { name: "Counting Sort", slug: "counting", complexities:{best:<>O(n + k)</>,avg:<>O(n + k)</>,worst:<>O(n + k)</>}, stable:true, inPlace:false, notes:"Necesită domeniu finit (k mic)." },
    { name: "Radix Sort", slug: "radix", complexities:{best:<>O(n·d)</>,avg:<>O(n·d)</>,worst:<>O(n·d)</>}, stable:true, inPlace:false, notes:"De obicei cu Counting stabil pe cifre." },
    { name: "Bucket Sort", slug: "bucket", complexities:{best:<>O(n)</>,avg:<>O(n)</>,worst:<>O(n<b><sup>2</sup></b>)</>}, stable:true, inPlace:false, notes:"Bun pt. distribuții uniforme." },
    { name: "Pigeonhole Sort", slug: "pigeonhole", complexities:{best:<>O(n + k)</>,avg:<>O(n + k)</>,worst:<>O(n + k)</>}, stable:true, inPlace:false, notes:"Mapare directă în „căsuțe”." },
  ],

  /* IV. SPECIALE */
  special: [
    { name: "Bitonic Sort", slug: "bitonic", complexities:{best:<>O(n·log² n)</>,avg:<>O(n·log² n)</>,worst:<>O(n·log² n)</>}, stable:false, inPlace:false, notes:"Sorting network; excelent pe GPU." },
    { name: "Odd-Even Merge Sort", slug: "oddevenmerge", complexities:{best:<>O(n·log² n)</>,avg:<>O(n·log² n)</>,worst:<>O(n·log² n)</>}, stable:false, inPlace:false, notes:"Rețea Batcher." },
    { name: "Stooge Sort", slug: "stooge", complexities:{best:<>O(n<b><sup>2.7</sup></b>)</>,avg:<>O(n<b><sup>2.7</sup></b>)</>,worst:<>O(n<b><sup>2.7</sup></b>)</>}, stable:false, inPlace:true, notes:"Recursiv exotic." },
    { name: "Comb Sort", slug: "comb", complexities:{best:<>O(n·log n)</>,avg:<>≈O(n<b><sup>1.3</sup></b>–n<b><sup>2</sup></b>)</>,worst:<>O(n<b><sup>2</sup></b>)</>}, stable:false, inPlace:true, notes:"Gap shrink ~1.3." },
    { name: "Flash Sort", slug: "flash", complexities:{best:<>O(n)</>,avg:<>≈O(n)</>,worst:<>O(n<b><sup>2</sup></b>)</>}, stable:false, inPlace:true, notes:"Distribuțional; alias Bucket în vizualizare." },
  ],
};

/* ────────────────  V. STRUCTURI SPECIALE — TABEL  ──────────────── */
const STRUCTURES_TABLE = [
  { struct:"Liste înlănțuite", method:"Merge Sort", note:"Nu e nevoie de indexare" },
  { struct:"Fișiere mari (external sorting)", method:"External Merge Sort", note:"Folosește disc + RAM parțial" },
  { struct:"Fluxuri continue (stream)", method:"Insertion / Heap (min-heap sliding window)", note:"Timp real" },
  { struct:"Structuri arbori", method:"Tree Sort", note:"Inserare în BST → in-order traversal" },
  { struct:"Paralel / GPU", method:"Bitonic / Odd-even / Radix GPU", note:"Execuție masiv paralelă" },
];

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const items = useMemo(() => {
    if (!selected || selected === "structures") return [];
    const original = ALGORITHMS[selected] || [];
    if (!query.trim()) return original;
    return original.filter((a) => a.name.toLowerCase().includes(query.trim().toLowerCase()));
  }, [selected, query]);

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-zinc-100">
            Sortări — Hub interactiv
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
            Alege o categorie, apoi simulează algoritmul ales.
          </p>
        </div>

        <div className="sticky top-0 z-10 -mx-4 mb-6 bg-gradient-to-b from-zinc-50/95 to-zinc-50/70 px-4 py-4 backdrop-blur transition-colors dark:from-slate-950/90 dark:to-slate-950/60">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = selected === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelected(c.id)}
                  className={[
                    "h-10 rounded-xl border px-4 text-sm transition-colors",
                    active
                      ? "border-indigo-500 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-indigo-200 dark:hover:bg-indigo-500/30"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/60 dark:text-zinc-200 dark:hover:bg-slate-800",
                  ].join(" ")}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {selected && selected !== "structures" && (
            <div className="mt-4">
              <div className="relative w-full max-w-md">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Caută algoritm în categoria selectată…"
                  className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-3 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400"
                />
                <svg
                  className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          )}
        </div>

        {!selected ? (
          <div className="grid place-items-center rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/40">
            <div className="max-w-xl">
              <div className="mx-auto mb-4 h-10 w-10 rounded-lg bg-indigo-100 ring-1 ring-indigo-300 dark:bg-indigo-600/20 dark:ring-indigo-500/30" />
              <h2 className="text-lg font-medium text-slate-950 dark:text-zinc-100">
                Alege o categorie pentru a începe
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                Carduri cu complexități + buton „Simulează”.
              </p>
            </div>
          </div>
        ) : selected === "structures" ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                V. Sortări pentru structuri speciale
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-slate-700 dark:text-zinc-300">
                    <th className="w-1/3 border-b border-slate-200 px-4 py-3 text-left font-medium dark:border-slate-800">
                      Structură
                    </th>
                    <th className="w-1/3 border-b border-slate-200 px-4 py-3 text-left font-medium dark:border-slate-800">
                      Metodă potrivită
                    </th>
                    <th className="w-1/3 border-b border-slate-200 px-4 py-3 text-left font-medium dark:border-slate-800">
                      Explicație
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {STRUCTURES_TABLE.map((row) => (
                    <tr
                      key={row.struct}
                      className="text-slate-800 transition-colors hover:bg-slate-50 dark:text-zinc-200 dark:hover:bg-slate-800/40"
                    >
                      <td className="px-4 py-3">{row.struct}</td>
                      <td className="px-4 py-3">{row.method}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-zinc-300">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((algo) => (
              <div
                key={algo.name}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white dark:bg-black p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900/40"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-950 dark:text-zinc-100">
                    {algo.name}
                  </h3>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors dark:border-slate-800 dark:bg-slate-950/50">
                  <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-500">
                    Complexitate
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                        Best
                      </div>
                      <div className="font-mono text-slate-900 dark:text-zinc-100">
                        {algo.complexities.best}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                        Avg
                      </div>
                      <div className="font-mono text-slate-900 dark:text-zinc-100">
                        {algo.complexities.avg}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                        Worst
                      </div>
                      <div className="font-mono text-slate-900 dark:text-zinc-100">
                        {algo.complexities.worst}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={[
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      algo.stable
                        ? "border-emerald-500/30 bg-emerald-100 text-emerald-700 dark:bg-emerald-600/20 dark:text-emerald-200"
                        : "border-rose-500/30 bg-rose-100 text-rose-700 dark:bg-rose-600/10 dark:text-rose-200",
                    ].join(" ")}
                  >
                    {algo.stable ? "Stabil" : "Instabil"}
                  </span>

                  <span
                    className={[
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      algo.inPlace
                        ? "border-cyan-500/30 bg-cyan-100 text-cyan-700 dark:bg-cyan-600/20 dark:text-cyan-200"
                        : "border-amber-500/30 bg-amber-100 text-amber-700 dark:bg-amber-600/20 dark:text-amber-200",
                    ].join(" ")}
                  >
                    {algo.inPlace ? "In-place" : "Aux mem"}
                  </span>
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-zinc-300/90">
                  {algo.notes}
                </p>

                <button
                  onClick={() => navigate(`/simulate/${algo.slug}`)}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-indigo-400/30 transition hover:bg-indigo-500"
                  title="Deschide simularea"
                >
                  Simulează
                </button>

                <button
                  onClick={() => navigate(`/code/${algo.slug}`)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/60 dark:text-zinc-200 dark:hover:bg-slate-800"
                  title="Vezi codul (C++ / Java / Python)"
                >
                  Cod
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/50 dark:text-zinc-400">
          <div className="mb-1 font-medium text-slate-800 dark:text-zinc-300">
            Legendă
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400/80" /> Stabil
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-400/80" /> Instabil
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400/80" /> In-place
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400/80" /> Aux mem
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
