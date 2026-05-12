import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ALGORITHM_THEORY,
  GLOSSARY,
  RECOMMENDATIONS,
  THEORY_CATEGORIES,
  THEORY_SECTIONS,
} from "../data/theoryData";

const CATEGORY_LABELS = {
  basics: "Noțiuni de bază",
  complexity: "Complexitate",
  properties: "Proprietăți",
  algorithms: "Algoritmi",
  practical: "Aplicare practică",
};

function Badge({ children, variant = "default" }) {
  const classes = {
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
        classes[variant],
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function TheoryCard({ section }) {
  const [open, setOpen] = useState(false);

  const levelVariant =
    section.level === "Începător"
      ? "green"
      : section.level === "Mediu"
      ? "indigo"
      : "amber";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400/60 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-indigo-400/40">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant="indigo">
          {CATEGORY_LABELS[section.category] || section.category}
        </Badge>
        <Badge variant={levelVariant}>{section.level}</Badge>
      </div>

      <h2 className="text-lg font-semibold text-slate-950 dark:text-zinc-100">
        {section.title}
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
        {section.summary}
      </p>

      {open && (
        <div className="mt-4 space-y-3">
          {section.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-sm leading-relaxed text-slate-700 dark:text-zinc-300"
            >
              {paragraph}
            </p>
          ))}

          {section.example && (
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-50 p-3 text-sm text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-200">
              <div className="mb-1 font-semibold">Exemplu</div>
              <div>{section.example}</div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="mt-4 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/70 dark:text-zinc-200 dark:hover:bg-slate-800"
      >
        {open ? "Ascunde explicația" : "Citește mai mult"}
      </button>
    </article>
  );
}

function AlgorithmTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
      <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
          Tabel comparativ al algoritmilor
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
          Compară rapid complexitatea, stabilitatea și memoria folosită.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-950/60">
            <tr className="text-slate-700 dark:text-zinc-300">
              <th className="px-4 py-3 text-left">Algoritm</th>
              <th className="px-4 py-3 text-center">Best</th>
              <th className="px-4 py-3 text-center">Average</th>
              <th className="px-4 py-3 text-center">Worst</th>
              <th className="px-4 py-3 text-center">Memorie</th>
              <th className="px-4 py-3 text-center">Stabil</th>
              <th className="px-4 py-3 text-center">In-place</th>
              <th className="px-4 py-3 text-center">Acțiuni</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-zinc-300">
            {ALGORITHM_THEORY.map((algo) => (
              <tr
                key={algo.slug}
                className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <td className="px-4 py-3">
                  <div className="font-semibold text-slate-950 dark:text-zinc-100">
                    {algo.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-zinc-500">
                    {algo.category}
                  </div>
                </td>
                <td className="px-4 py-3 text-center font-mono">{algo.best}</td>
                <td className="px-4 py-3 text-center font-mono">
                  {algo.average}
                </td>
                <td className="px-4 py-3 text-center font-mono">
                  {algo.worst}
                </td>
                <td className="px-4 py-3 text-center font-mono">
                  {algo.memory}
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge variant={algo.stable ? "green" : "rose"}>
                    {algo.stable ? "Da" : "Nu"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge variant={algo.inPlace ? "green" : "amber"}>
                    {algo.inPlace ? "Da" : "Nu"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/simulate/${algo.slug}`}
                      className="rounded-lg bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-500"
                    >
                      Simulează
                    </Link>
                    <Link
                      to={`/code/${algo.slug}`}
                      className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-zinc-200 dark:hover:bg-slate-800"
                    >
                      Cod
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RecommendationPanel() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
          Cum aleg algoritmul potrivit?
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
          În practică, alegerea algoritmului depinde de forma datelor și de
          cerințele problemei.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {RECOMMENDATIONS.map((item) => (
          <div
            key={item.situation}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40"
          >
            <div className="text-sm font-semibold text-slate-950 dark:text-zinc-100">
              {item.situation}
            </div>

            <div className="mt-2">
              <Badge variant="indigo">{item.recommended}</Badge>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              {item.reason}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Glossary() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
          Glosar rapid
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
          Termeni importanți folosiți în analiza algoritmilor de sortare.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {GLOSSARY.map((item) => (
          <div
            key={item.term}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40"
          >
            <div className="font-semibold text-slate-950 dark:text-zinc-100">
              {item.term}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              {item.definition}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Theory() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return THEORY_SECTIONS.filter((section) => {
      const matchesCategory =
        selectedCategory === "all" || section.category === selectedCategory;

      const searchable = [
        section.title,
        section.summary,
        section.level,
        section.category,
        section.example,
        ...section.content,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !normalizedQuery || searchable.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, query]);

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:py-10">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="grid gap-6 p-6 md:grid-cols-[1.4fr,0.8fr] md:p-8">
            <div>
              <Badge variant="indigo">Manual interactiv</Badge>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-zinc-100 md:text-4xl">
                Teorie pentru algoritmi de sortare
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-zinc-400 md:text-base">
                Această secțiune explică noțiunile esențiale despre sortare:
                complexitate, stabilitate, memorie, comparații, interschimbări
                și alegerea algoritmului potrivit pentru o situație reală.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  to="/simulate/bubble"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Începe o simulare
                </Link>

                <Link
                  to="/tests"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-zinc-200 dark:hover:bg-slate-800"
                >
                  Rezolvă teste
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
                  {THEORY_SECTIONS.length}
                </div>
                <div className="text-sm text-slate-600 dark:text-zinc-400">
                  lecții scurte
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
                  {ALGORITHM_THEORY.length}
                </div>
                <div className="text-sm text-slate-600 dark:text-zinc-400">
                  algoritmi comparați
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
                  {GLOSSARY.length}
                </div>
                <div className="text-sm text-slate-600 dark:text-zinc-400">
                  termeni în glosar
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-14 z-20 -mx-4 bg-gradient-to-b from-zinc-50/95 to-zinc-50/70 px-4 py-4 backdrop-blur dark:from-slate-950/95 dark:to-slate-950/70">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {THEORY_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={[
                    "rounded-xl border px-4 py-2 text-sm font-medium transition",
                    selectedCategory === category.id
                      ? "border-indigo-500 bg-indigo-100 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-indigo-200"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/70 dark:text-zinc-200 dark:hover:bg-slate-800",
                  ].join(" ")}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:max-w-sm">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Caută în teorie..."
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 pr-9 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400"
              />

              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                {filteredSections.length} rezultate găsite
              </p>
            </div>
          </div>

          {filteredSections.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 dark:text-zinc-400">
              Nu am găsit nicio lecție pentru filtrul ales.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredSections.map((section) => (
                <TheoryCard key={section.id} section={section} />
              ))}
            </div>
          )}
        </section>

        <AlgorithmTable />

        <RecommendationPanel />

        <Glossary />
      </div>
    </div>
  );
}