import React, { useMemo, useState } from "react";

/* ─────────────────────────  CATEGORII  ───────────────────────── */
const CATEGORIES = [
  { id: "simple", label: "I. Sortări simple" },
  { id: "efficient", label: "II. Sortări eficiente" },
  { id: "linear", label: "III. Sortări liniare" },
  { id: "special", label: "IV. Sortări speciale" },
  { id: "structures", label: "V. Sortări pentru structuri speciale" },
];

/* helper scurt pt a scrie mai ușor bucăți JSX */
const J = React.createElement;

/* ─────────────────────────  ALGORITMI  ─────────────────────────
   NOTAȚIE: multiplicare „·”, puteri cu Unicode, log cu <sub> pentru baza.
*/
const ALGORITHMS = {
  /* I. SIMPLE */
  simple: [
    {
      name: "Bubble Sort",
      complexities: {
        best: <>O(n)</>,
        avg: <>O(n<b><sup>2</sup></b>)</>,
        worst: <>O(n<b><sup>2</sup></b>)</>,
      },
      stable: true,
      inPlace: true,
      notes: "Cu early-exit (flag), detectează dacă secvența e deja sortată.",
    },
    {
      name: "Selection Sort",
      complexities: {
        best: <>O(n<b><sup>2</sup></b>)</>,
        avg: <>O(n<b><sup>2</sup></b>)</>,
        worst: <>O(n<b><sup>2</sup></b>)</>,
      },
      stable: false,
      inPlace: true,
      notes: "Puține swap-uri (≤ n). Ineficient pentru liste mari.",
    },
    {
      name: "Insertion Sort",
      complexities: {
        best: <>O(n)</>,
        avg: <>O(n<b><sup>2</sup></b>)</>,
        worst: <>O(n<b><sup>2</sup></b>)</>,
      },
      stable: true,
      inPlace: true,
      notes: "Excelent pe date aproape sortate sau loturi mici.",
    },
    {
      name: "Gnome Sort",
      complexities: {
        best: <>O(n)</>,
        avg: <>O(n<b><sup>2</sup></b>)</>,
        worst: <>O(n<b><sup>2</sup></b>)</>,
      },
      stable: true,
      inPlace: true,
      notes: "Similar cu insertion, dar cu pași „înapoi” când întâlnește inversiuni.",
    },
    {
      name: "Cocktail Shaker Sort",
      complexities: {
        best: <>O(n)</>,
        avg: <>O(n<b><sup>2</sup></b>)</>,
        worst: <>O(n<b><sup>2</sup></b>)</>,
      },
      stable: true,
      inPlace: true,
      notes: "Bubble în ambele sensuri; reduce elementele „blocate” la capete.",
    },
    {
      name: "Odd–Even Sort",
      complexities: {
        best: <>O(n)</>,
        avg: <>O(n<b><sup>2</sup></b>)</>,
        worst: <>O(n<b><sup>2</sup></b>)</>,
      },
      stable: true,
      inPlace: true,
      notes: "Variantă de bubble utilă pe modele paralele / rețele de comparatoare.",
    },
  ],

  /* II. EFICIENTE */
  efficient: [
    {
      name: "Merge Sort",
      complexities: {
        best: <>O(n·log n)</>,
        avg: <>O(n·log n)</>,
        worst: <>O(n·log n)</>,
      },
      stable: true,
      inPlace: false,
      notes: "Divide et impera; excelent la scară mare; bun pentru liste legate.",
    },
    {
      name: "Quick Sort",
      complexities: {
        best: <>O(n·log n)</>,
        avg: <>O(n·log n)</>,
        worst: <>O(n<b><sup>2</sup></b>)</>,
      },
      stable: false,
      inPlace: true,
      notes: "Foarte rapid în practică; alegerea pivotului e critică.",
    },
    {
      name: "Heap Sort",
      complexities: {
        best: <>O(n·log n)</>,
        avg: <>O(n·log n)</>,
        worst: <>O(n·log n)</>,
      },
      stable: false,
      inPlace: true,
      notes: "Previzibil; fără memorie auxiliară semnificativă.",
    },
    {
    name: "Shell Sort",
    complexities: {
        best: <>O(n·log² n)</>,
        avg: <>O(n·√n)</>,   
        worst: <>O(n<b><sup>2</sup></b>)</>,
    },
    stable: false,
    inPlace: true,
    notes: "Performanța depinde de secvența de gap-uri (Knuth/Pratt etc.).",
    },
    {
      name: "Intro Sort",
      complexities: {
        best: <>O(n·log n)</>,
        avg: <>O(n·log n)</>,
        worst: <>O(n·log n)</>,
      },
      stable: false,
      inPlace: true,
      notes: "Hibrid Quick+Heap+Insertion (fallback pe Heap la adâncime mare).",
    },
    {
      name: "Tim Sort",
      complexities: {
        best: <>O(n)</>,
        avg: <>O(n·log n)</>,
        worst: <>O(n·log n)</>,
      },
      stable: true,
      inPlace: false,
      notes: "Hibrid merge+insertion; Python/Java. Exploatează run-uri existente.",
    },
  ],

  /* III. LINIARE */
  linear: [
    {
      name: "Counting Sort",
      complexities: {
        best: <>O(n + k)</>,
        avg: <>O(n + k)</>,
        worst: <>O(n + k)</>,
      },
      stable: true,
      inPlace: false,
      notes: "Necesită domeniu finit și relativ mic (k).",
    },
    {
      name: "Radix Sort",
      complexities: {
        best: <>O(n·d)</>,
        avg: <>O(n·d)</>,
        worst: <>O(n·d)</>,
      },
      stable: true,
      inPlace: false,
      notes: "d = nr. de cifre/chei; de obicei cu Counting stabil pe cifre.",
    },
    {
      name: "Bucket Sort",
      complexities: {
        best: <>O(n)</>,
        avg: <>O(n)</>,
        worst: <>O(n<b><sup>2</sup></b>)</>,
      },
      stable: true,
      inPlace: false,
      notes: "Eficient pentru distribuții uniforme (ex. [0,1)).",
    },
    {
      name: "Pigeonhole Sort",
      complexities: {
        best: <>O(n + k)</>,
        avg: <>O(n + k)</>,
        worst: <>O(n + k)</>,
      },
      stable: true,
      inPlace: false,
      notes: "Similar cu Counting; mapare directă în „căsuțe” (k = interval valori).",
    },
  ],

  /* IV. SPECIALE */
  special: [
    {
      name: "Bitonic Sort",
      complexities: {
        best: <>O(n·log² n)</>,
        avg: <>O(n·log² n)</>,
        worst: <>O(n·log² n)</>,
      },
      stable: false,
      inPlace: false,
      notes: "Rețea de sortare; foarte potrivit pe GPU/ASIC/FPGA.",
    },
    {
      name: "Odd-Even Merge Sort",
      complexities: {
        best: <>O(n·log² n)</>,
        avg: <>O(n·log² n)</>,
        worst: <>O(n·log² n)</>,
      },
      stable: false,
      inPlace: false,
      notes: "Sorting network (Batcher); paralelizabil.",
    },
    {
      name: "Bogo Sort",
      complexities: {
        best: <>O(n)</>,
        avg: <>≈O(n·n!)</>,
        worst: <>—</>,
      },
      stable: false,
      inPlace: false,
      notes: "Algoritm „de glumă”: permută aleator până iese sortat.",
    },
    {
      name: "Stooge Sort",
      complexities: {
        best: <>O(n<b><sup>2.7</sup></b>)</>,  
        avg: <>O(n<b><sup>2.7</sup></b>)</>,
        worst: <>O(n<b><sup>2.7</sup></b>)</>,
      },
      stable: false,
      inPlace: true,
      notes: "Recursiv exotic, folosit didactic, nu practic.",
    },
    {
      name: "Comb Sort",
      complexities: {
        best: <>O(n·log n)</>,
        avg: <>≈O(n<b><sup>1.3</sup></b>–n<b><sup>2</sup></b>)</>, 
        worst: <>O(n<b><sup>2</sup></b>)</>,
      },
      stable: false,
      inPlace: true,
      notes: "Îmbunătățește bubble cu „gap” care descrește (shrink factor ~1.3).",
    },
    {
      name: "Sleep Sort",
      complexities: {
        best: <>—</>,
        avg: <>—</>,
        worst: <>—</>,
      },
      stable: false,
      inPlace: false,
      notes: "Trick concurent (timers); nu e algoritm valid teoretic.",
    },
    {
      name: "Flash Sort",
      complexities: {
        best: <>O(n)</>,
        avg: <>≈O(n)</>,
        worst: <>O(n<b><sup>2</sup></b>)</>,
      },
      stable: false,
      inPlace: true,
      notes: "Distribuțional, foarte rapid pe anumite distribuții.",
    },
  ],
};

/* ────────────────  V. STRUCTURI SPECIALE — TABEL  ──────────────── */
const STRUCTURES_TABLE = [
  {
    struct: "Liste înlănțuite",
    method: "Merge Sort",
    note: "Nu e nevoie de indexare",
  },
  {
    struct: "Fișiere mari (external sorting)",
    method: "External Merge Sort",
    note: "Folosește disc + RAM parțial",
  },
  {
    struct: "Fluxuri continue (stream)",
    method: "Insertion / Heap (min-heap sliding window)",
    note: "Timp real",
  },
  {
    struct: "Structuri arbori",
    method: "Tree Sort",
    note: "Inserare în BST → in-order traversal",
  },
  {
    struct: "Paralel / GPU",
    method: "Bitonic / Odd-even / Radix GPU",
    note: "Execuție masiv paralelă",
  },
];

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    if (!selected || selected === "structures") return [];
    const original = ALGORITHMS[selected] || [];
    if (!query.trim()) return original;
    return original.filter((a) =>
      a.name.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [selected, query]);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sortări — Hub interactiv
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Alege o categorie. Vei vedea algoritmii cu complexități, stabilitate și note — în stil IDE.
          </p>
        </div>

        {/* Categorii */}
        <div className="sticky top-0 z-10 -mx-4 mb-6 bg-gradient-to-b from-slate-950/90 to-slate-950/60 px-4 py-4 backdrop-blur">
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
                      ? "border-indigo-400 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30"
                      : "border-slate-700 bg-slate-900/60 text-zinc-200 hover:bg-slate-800",
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/60 py-2 pl-3 pr-9 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-400 focus:outline-none"
                />
                <svg
                  className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
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

        {/* Conținut: carduri (I–IV) sau tabel (V) */}
        {!selected ? (
          <div className="grid place-items-center rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center">
            <div className="max-w-xl">
              <div className="mx-auto mb-4 h-10 w-10 rounded-lg bg-indigo-600/20 ring-1 ring-indigo-500/30" />
              <h2 className="text-lg font-medium">Alege o categorie pentru a începe</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Panouri întunecate, accente indigo/emerald, carduri cu complexități.
              </p>
            </div>
          </div>
        ) : selected === "structures" ? (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-400" />
              <span className="text-sm font-semibold text-zinc-200">
                V. Sortări pentru structuri speciale
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-zinc-300">
                    <th className="w-1/3 border-b border-slate-800 px-4 py-3 text-left font-medium">
                      Structură
                    </th>
                    <th className="w-1/3 border-b border-slate-800 px-4 py-3 text-left font-medium">
                      Metodă potrivită
                    </th>
                    <th className="w-1/3 border-b border-slate-800 px-4 py-3 text-left font-medium">
                      Explicație
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {STRUCTURES_TABLE.map((row) => (
                    <tr key={row.struct} className="text-zinc-200">
                      <td className="px-4 py-3">{row.struct}</td>
                      <td className="px-4 py-3">{row.method}</td>
                      <td className="px-4 py-3 text-zinc-300">{row.note}</td>
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
                className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-900/40 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-zinc-100">
                    {algo.name}
                  </h3>
                  <svg
                    className="h-4 w-4 text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                  <div className="mb-1 text-[10px] uppercase tracking-wider text-zinc-500">
                    Complexitate
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <div className="text-[11px] text-zinc-400">Best</div>
                      <div className="font-mono text-zinc-100">{algo.complexities.best}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-zinc-400">Avg</div>
                      <div className="font-mono text-zinc-100">{algo.complexities.avg}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-zinc-400">Worst</div>
                      <div className="font-mono text-zinc-100">{algo.complexities.worst}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={[
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                      algo.stable
                        ? "border-emerald-500/30 bg-emerald-600/20 text-emerald-200"
                        : "border-rose-500/30 bg-rose-600/10 text-rose-200",
                    ].join(" ")}
                  >
                    {algo.stable ? "Stabil" : "Instabil"}
                  </span>
                  <span
                    className={[
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                      algo.inPlace
                        ? "border-cyan-500/30 bg-cyan-600/20 text-cyan-200"
                        : "border-amber-500/30 bg-amber-600/20 text-amber-200",
                    ].join(" ")}
                  >
                    {algo.inPlace ? "In-place" : "Aux mem"}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-zinc-300/90">
                  {algo.notes}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Legendă */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-zinc-400">
          <div className="mb-1 font-medium text-zinc-300">Legendă</div>
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
