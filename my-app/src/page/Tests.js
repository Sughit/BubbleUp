import React, { useEffect, useMemo, useState } from "react";
import { getPublishedTests } from "../component/testsService";
import { LABELS } from "../component/simulationHelper";

const CATEGORIES = [
  { id: "simple", label: "I. Sortări simple" },
  { id: "efficient", label: "II. Sortări eficiente" },
  { id: "linear", label: "III. Sortări liniare" },
  { id: "special", label: "IV. Sortări speciale" },
  { id: "structures", label: "V. Structuri speciale" },
];

const TYPE_LABELS = {
  single: "Răspuns unic",
  multiple: "Răspuns multiplu",
  truefalse: "Adevărat/Fals",
  order: "Ordonare",
  fillblank: "Completare",
  codeTrace: "Urmărire cod",
  scenario: "Situație practică",
};

const DIFFICULTY_LABELS = {
  "ușor": "Ușor",
  usor: "Ușor",
  mediu: "Mediu",
  greu: "Greu",
};

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function sameArray(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function TestCard({ test, onAnswered }) {
  const [answer, setAnswer] = useState("");
  const [checkedAnswers, setCheckedAnswers] = useState([]);
  const [orderText, setOrderText] = useState("");
  const [blankAnswer, setBlankAnswer] = useState("");
  const [status, setStatus] = useState(null);

  const options = useMemo(() => {
    if (test.type === "truefalse" && (!test.options || test.options.length === 0)) {
      return ["Adevărat", "Fals"];
    }

    return test.options || [];
  }, [test]);

  const toggleCheck = (option) => {
    setCheckedAnswers((prev) =>
      prev.includes(option)
        ? prev.filter((x) => x !== option)
        : [...prev, option]
    );
  };

  const verify = () => {
    let result = false;

    if (test.type === "single") {
      result = answer === test.correctAnswer;
    }

    if (test.type === "scenario") {
      result = answer === test.correctAnswer;
    }

    if (test.type === "codeTrace") {
      result = answer === test.correctAnswer;
    }

    if (test.type === "truefalse") {
      result = answer === test.correctAnswer;
    }

    if (test.type === "multiple") {
      const user = [...checkedAnswers].map(normalizeText).sort();
      const correct = [...(test.correctAnswers || [])].map(normalizeText).sort();
      result = sameArray(user, correct);
    }

    if (test.type === "order") {
      const userOrder = orderText
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
        .map(normalizeText);

      const correctOrder = (test.orderAnswer || []).map(normalizeText);

      result = sameArray(userOrder, correctOrder);
    }

    if (test.type === "fillblank") {
      result =
        normalizeText(blankAnswer) === normalizeText(test.correctAnswer) ||
        (test.correctAnswers || []).map(normalizeText).includes(normalizeText(blankAnswer));
    }

    setStatus(result);
    onAnswered?.(test.id, result);
  };

  const resetAnswer = () => {
    setAnswer("");
    setCheckedAnswers([]);
    setOrderText("");
    setBlankAnswer("");
    setStatus(null);
    onAnswered?.(test.id, null);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:bg-black p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900/40">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-indigo-500/30 bg-indigo-100 px-2.5 py-0.5 text-xs text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200">
          {LABELS[test.algorithmSlug] || test.algorithmSlug || "General"}
        </span>

        <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-0.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-950/60 dark:text-zinc-300">
          {DIFFICULTY_LABELS[test.difficulty] || test.difficulty || "Mediu"}
        </span>

        <span className="rounded-full border border-cyan-500/30 bg-cyan-100 px-2.5 py-0.5 text-xs text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-200">
          {TYPE_LABELS[test.type] || test.type}
        </span>
      </div>

      <h3 className="text-base font-semibold text-slate-950 dark:text-zinc-100">
        {test.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
        {test.question}
      </p>

      {test.codeSnippet && (
        <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-3 text-xs leading-5 text-zinc-100 dark:border-slate-800">
          <code>{test.codeSnippet}</code>
        </pre>
      )}

      <div className="mt-4 space-y-2">
        {(test.type === "single" ||
          test.type === "truefalse" ||
          test.type === "scenario" ||
          test.type === "codeTrace") &&
          options.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/40 dark:text-zinc-200 dark:hover:bg-slate-800/60"
            >
              <input
                type="radio"
                name={test.id}
                value={option}
                checked={answer === option}
                onChange={() => setAnswer(option)}
              />
              <span>{option}</span>
            </label>
          ))}

        {test.type === "multiple" &&
          options.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/40 dark:text-zinc-200 dark:hover:bg-slate-800/60"
            >
              <input
                type="checkbox"
                checked={checkedAnswers.includes(option)}
                onChange={() => toggleCheck(option)}
              />
              <span>{option}</span>
            </label>
          ))}

        {test.type === "order" && (
          <>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950/40 dark:text-zinc-300">
              Variante: {(test.options || []).join(", ")}
            </div>

            <input
              value={orderText}
              onChange={(e) => setOrderText(e.target.value)}
              placeholder="Scrie ordinea corectă, separată prin virgulă"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400"
            />
          </>
        )}

        {test.type === "fillblank" && (
          <input
            value={blankAnswer}
            onChange={(e) => setBlankAnswer(e.target.value)}
            placeholder="Scrie răspunsul..."
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400"
          />
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={verify}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
          Verifică
        </button>

        {status !== null && (
          <button
            onClick={resetAnswer}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/60 dark:text-zinc-200 dark:hover:bg-slate-800"
          >
            Reîncearcă
          </button>
        )}
      </div>

      {status !== null && (
        <div
          className={[
            "mt-4 rounded-xl border px-3 py-2 text-sm",
            status
              ? "border-emerald-500/30 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200"
              : "border-rose-500/30 bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
          ].join(" ")}
        >
          <div className="font-semibold">
            {status ? "Corect!" : "Greșit."}
          </div>

          {test.explanation && (
            <div className="mt-1 text-slate-700 dark:text-zinc-300">
              {test.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Tests() {
  const [tests, setTests] = useState([]);
  const [selected, setSelected] = useState("simple");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({});

  useEffect(() => {
    async function loadTests() {
      try {
        const data = await getPublishedTests();
        setTests(data);
      } finally {
        setLoading(false);
      }
    }

    loadTests();
  }, []);

  const visibleTests = useMemo(
    () => tests.filter((t) => t.category === selected),
    [tests, selected]
  );

  const selectedStats = useMemo(() => {
    const ids = visibleTests.map((t) => t.id);
    const answered = ids.filter((id) => results[id] !== undefined && results[id] !== null);
    const correct = answered.filter((id) => results[id] === true);

    return {
      total: visibleTests.length,
      answered: answered.length,
      correct: correct.length,
      percent: answered.length ? Math.round((correct.length / answered.length) * 100) : 0,
    };
  }, [visibleTests, results]);

  const handleAnswered = (id, result) => {
    setResults((prev) => ({
      ...prev,
      [id]: result,
    }));
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-zinc-100">
              Teste
            </h1>

            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
              Alege categoria și rezolvă întrebările. Primești feedback imediat după verificare.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="font-semibold text-slate-900 dark:text-zinc-100">
              Progres categorie
            </div>
            <div className="mt-1 text-slate-600 dark:text-zinc-400">
              {selectedStats.correct}/{selectedStats.answered} corecte · {selectedStats.percent}%
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-10 -mx-4 mb-6 bg-gradient-to-b from-zinc-50/95 to-zinc-50/70 px-4 py-4 backdrop-blur transition-colors dark:from-slate-950/90 dark:to-slate-950/60">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={[
                  "h-10 rounded-xl border px-4 text-sm transition-colors",
                  selected === c.id
                    ? "border-indigo-500 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-indigo-200 dark:hover:bg-indigo-500/30"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/60 dark:text-zinc-200 dark:hover:bg-slate-800",
                ].join(" ")}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/50 dark:text-zinc-300">
            Se încarcă testele...
          </div>
        ) : visibleTests.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/50 dark:text-zinc-300">
            Nu există încă teste în această categorie.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {visibleTests.map((test) => (
              <TestCard
                key={test.id}
                test={test}
                onAnswered={handleAnswered}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}