import React, { useEffect, useMemo, useState } from "react";
import {
  addSortingTest,
  deleteSortingTest,
  getAllSortingTests,
  setTestPublished,
  updateSortingTest,
} from "../component/testsService";
import { ALLOWED_SLUGS, LABELS } from "../component/simulationHelper";

const CATEGORIES = [
  { id: "simple", label: "I. Sortări simple" },
  { id: "efficient", label: "II. Sortări eficiente" },
  { id: "linear", label: "III. Sortări liniare" },
  { id: "special", label: "IV. Sortări speciale" },
  { id: "structures", label: "V. Structuri speciale" },
];

const TYPES = [
  { id: "single", label: "Răspuns unic" },
  { id: "multiple", label: "Răspuns multiplu" },
  { id: "truefalse", label: "Adevărat/Fals" },
  { id: "order", label: "Ordonare" },
  { id: "fillblank", label: "Completare spațiu liber" },
  { id: "codeTrace", label: "Urmărire cod" },
  { id: "scenario", label: "Situație practică" },
];

const DIFFICULTIES = [
  { id: "ușor", label: "Ușor" },
  { id: "mediu", label: "Mediu" },
  { id: "greu", label: "Greu" },
];

const emptyForm = {
  title: "",
  category: "simple",
  algorithmSlug: "bubble",
  type: "single",
  difficulty: "ușor",
  question: "",
  codeSnippet: "",
  optionsText: "",
  correctAnswer: "",
  correctAnswersText: "",
  orderAnswerText: "",
  explanation: "",
};

const TYPE_LABELS = Object.fromEntries(TYPES.map((t) => [t.id, t.label]));
const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));
const DIFFICULTY_LABELS = Object.fromEntries(
  DIFFICULTIES.map((d) => [d.id, d.label])
);

export default function Admin() {
  const [form, setForm] = useState(emptyForm);
  const [tests, setTests] = useState([]);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingTests, setLoadingTests] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [filters, setFilters] = useState({
    category: "all",
    algorithmSlug: "all",
    type: "all",
    difficulty: "all",
    status: "all",
    search: "",
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const lines = (text) =>
    text
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

  const loadTests = async () => {
    try {
      setLoadingTests(true);
      const data = await getAllSortingTests();
      setTests(data);
    } catch {
      setMsg("Nu s-au putut încărca testele.");
    } finally {
      setLoadingTests(false);
    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  const buildPayload = () => {
    const options =
      form.type === "truefalse" && !form.optionsText.trim()
        ? ["Adevărat", "Fals"]
        : lines(form.optionsText);

    const correctAnswers = lines(form.correctAnswersText);
    const orderAnswer = lines(form.orderAnswerText);

    return {
      title: form.title.trim(),
      category: form.category,
      algorithmSlug: form.algorithmSlug,
      type: form.type,
      difficulty: form.difficulty,
      question: form.question.trim(),
      codeSnippet: form.codeSnippet.trim(),
      options,
      correctAnswer: form.correctAnswer.trim(),
      correctAnswers,
      orderAnswer,
      explanation: form.explanation.trim(),
    };
  };

  const validateForm = () => {
    const options =
      form.type === "truefalse" && !form.optionsText.trim()
        ? ["Adevărat", "Fals"]
        : lines(form.optionsText);

    const correctAnswers = lines(form.correctAnswersText);
    const orderAnswer = lines(form.orderAnswerText);

    if (!form.title.trim() || !form.question.trim()) {
      return "Completează titlul și întrebarea.";
    }

    if (
      ["single", "multiple", "truefalse", "scenario", "codeTrace"].includes(
        form.type
      ) &&
      options.length < 2
    ) {
      return "Adaugă cel puțin două variante de răspuns.";
    }

    if (
      ["single", "truefalse", "scenario", "codeTrace", "fillblank"].includes(
        form.type
      ) &&
      !form.correctAnswer.trim() &&
      correctAnswers.length === 0
    ) {
      return "Completează răspunsul corect.";
    }

    if (form.type === "multiple" && correctAnswers.length === 0) {
      return "Completează răspunsurile corecte.";
    }

    if (form.type === "order" && options.length < 2) {
      return "Adaugă elementele care trebuie ordonate.";
    }

    if (form.type === "order" && orderAnswer.length === 0) {
      return "Completează ordinea corectă.";
    }

    return "";
  };

  const save = async (e) => {
    e.preventDefault();
    setMsg("");

    const error = validateForm();

    if (error) {
      setMsg(error);
      return;
    }

    const payload = buildPayload();

    try {
      setSaving(true);

      if (editingId) {
        await updateSortingTest(editingId, payload);
        setMsg("Test actualizat cu succes.");
      } else {
        await addSortingTest(payload);
        setMsg("Test adăugat cu succes.");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadTests();
    } catch {
      setMsg("Nu s-a putut salva testul. Verifică regulile Firebase.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (test) => {
    setEditingId(test.id);

    setForm({
      title: test.title || "",
      category: test.category || "simple",
      algorithmSlug: test.algorithmSlug || "bubble",
      type: test.type || "single",
      difficulty: test.difficulty || "ușor",
      question: test.question || "",
      codeSnippet: test.codeSnippet || "",
      optionsText: (test.options || []).join("\n"),
      correctAnswer: test.correctAnswer || "",
      correctAnswersText: (test.correctAnswers || []).join("\n"),
      orderAnswerText: (test.orderAnswer || []).join("\n"),
      explanation: test.explanation || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMsg("");
  };

  const togglePublished = async (test) => {
    try {
      await setTestPublished(test.id, !test.isPublished);
      setMsg(
        test.isPublished
          ? "Testul a fost ascuns."
          : "Testul a fost publicat."
      );
      await loadTests();
    } catch {
      setMsg("Nu s-a putut modifica statusul testului.");
    }
  };

  const removeTest = async (test) => {
    const ok = window.confirm(
      `Sigur vrei să ștergi testul „${test.title}”? Această acțiune nu poate fi anulată.`
    );

    if (!ok) return;

    try {
      await deleteSortingTest(test.id);
      setMsg("Test șters cu succes.");

      if (editingId === test.id) {
        cancelEdit();
      }

      await loadTests();
    } catch {
      setMsg("Nu s-a putut șterge testul.");
    }
  };

  const filteredTests = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return tests.filter((test) => {
      if (filters.category !== "all" && test.category !== filters.category) {
        return false;
      }

      if (
        filters.algorithmSlug !== "all" &&
        test.algorithmSlug !== filters.algorithmSlug
      ) {
        return false;
      }

      if (filters.type !== "all" && test.type !== filters.type) {
        return false;
      }

      if (
        filters.difficulty !== "all" &&
        test.difficulty !== filters.difficulty
      ) {
        return false;
      }

      if (filters.status === "published" && test.isPublished !== true) {
        return false;
      }

      if (filters.status === "draft" && test.isPublished === true) {
        return false;
      }

      if (!search) return true;

      const fullText = [
        test.title,
        test.question,
        test.explanation,
        LABELS[test.algorithmSlug],
        TYPE_LABELS[test.type],
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return fullText.includes(search);
    });
  }, [tests, filters]);

  const stats = useMemo(() => {
    const total = tests.length;
    const published = tests.filter((t) => t.isPublished).length;
    const drafts = total - published;

    return { total, published, drafts };
  }, [tests]);

  const fieldClass =
    "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400";

  const textareaClass =
    "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400";

  const labelClass = "text-sm text-slate-700 dark:text-zinc-300";

  const showOptions = [
    "single",
    "multiple",
    "truefalse",
    "scenario",
    "codeTrace",
  ].includes(form.type);

  const showCorrectAnswer = [
    "single",
    "truefalse",
    "scenario",
    "codeTrace",
    "fillblank",
  ].includes(form.type);

  return (
    <div className="min-h-screen bg-zinc-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950 dark:text-zinc-100">
              Admin
            </h1>

            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
              Adaugă, editează, publică sau șterge teste pentru algoritmii de
              sortare.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <div className="text-xl font-bold text-slate-950 dark:text-zinc-100">
                {stats.total}
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400">
                Total
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-100 px-4 py-3 shadow-sm dark:bg-emerald-500/10">
              <div className="text-xl font-bold text-emerald-700 dark:text-emerald-200">
                {stats.published}
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300">
                Publicate
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-100 px-4 py-3 shadow-sm dark:bg-amber-500/10">
              <div className="text-xl font-bold text-amber-700 dark:text-amber-200">
                {stats.drafts}
              </div>
              <div className="text-xs text-amber-700 dark:text-amber-300">
                Nepublicate
              </div>
            </div>
          </div>
        </div>

        {msg && (
          <div className="mb-4 rounded-xl border border-indigo-500/30 bg-indigo-100 px-3 py-2 text-sm text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200">
            {msg}
          </div>
        )}

        <form
          onSubmit={save}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/60"
        >
          <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950 dark:text-zinc-100">
                {editingId ? "Editează testul" : "Adaugă test nou"}
              </h2>

              <p className="text-sm text-slate-600 dark:text-zinc-400">
                Completează datele testului și salvează-l în Firebase.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="w-fit rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950/60 dark:text-zinc-200 dark:hover:bg-slate-800"
              >
                Anulează editarea
              </button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Titlu test</label>
              <input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className={fieldClass}
                placeholder="Ex: Complexitatea Bubble Sort"
              />
            </div>

            <div>
              <label className={labelClass}>Dificultate</label>
              <select
                value={form.difficulty}
                onChange={(e) => update("difficulty", e.target.value)}
                className={fieldClass}
              >
                {DIFFICULTIES.map((difficulty) => (
                  <option key={difficulty.id} value={difficulty.id}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Categorie</label>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className={fieldClass}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Algoritm</label>
              <select
                value={form.algorithmSlug}
                onChange={(e) => update("algorithmSlug", e.target.value)}
                className={fieldClass}
              >
                {ALLOWED_SLUGS.map((slug) => (
                  <option key={slug} value={slug}>
                    {LABELS[slug]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Tip test</label>
              <select
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
                className={fieldClass}
              >
                {TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Întrebare</label>
            <textarea
              value={form.question}
              onChange={(e) => update("question", e.target.value)}
              className={`${textareaClass} h-28`}
              placeholder="Scrie întrebarea..."
            />
          </div>

          {(form.type === "codeTrace" || form.type === "scenario") && (
            <div>
              <label className={labelClass}>
                Fragment de cod sau context opțional
              </label>

              <textarea
                value={form.codeSnippet}
                onChange={(e) => update("codeSnippet", e.target.value)}
                className={`${textareaClass} h-32 font-mono text-sm`}
                placeholder={`Ex:\nfor (int j = 0; j < n - i - 1; j++)\n  if (a[j] > a[j + 1]) swap(a[j], a[j + 1]);`}
              />
            </div>
          )}

          {showOptions && (
            <div>
              <label className={labelClass}>
                Variante de răspuns — câte una pe linie
              </label>

              <textarea
                value={form.optionsText}
                onChange={(e) => update("optionsText", e.target.value)}
                className={`${textareaClass} h-32 font-mono text-sm`}
                placeholder={
                  form.type === "truefalse"
                    ? "Poți lăsa gol. Se folosesc automat Adevărat / Fals."
                    : `O(n)\nO(n^2)\nO(n log n)`
                }
              />
            </div>
          )}

          {showCorrectAnswer && (
            <div>
              <label className={labelClass}>
                Răspuns corect — exact ca în variante
              </label>

              <input
                value={form.correctAnswer}
                onChange={(e) => update("correctAnswer", e.target.value)}
                className={fieldClass}
                placeholder="Ex: O(n^2)"
              />
            </div>
          )}

          {form.type === "multiple" && (
            <div>
              <label className={labelClass}>
                Răspunsuri corecte — câte unul pe linie
              </label>

              <textarea
                value={form.correctAnswersText}
                onChange={(e) => update("correctAnswersText", e.target.value)}
                className={`${textareaClass} h-24 font-mono text-sm`}
                placeholder={`Stabil\nIn-place`}
              />
            </div>
          )}

          {form.type === "fillblank" && (
            <div>
              <label className={labelClass}>
                Variante acceptate opțional — câte una pe linie
              </label>

              <textarea
                value={form.correctAnswersText}
                onChange={(e) => update("correctAnswersText", e.target.value)}
                className={`${textareaClass} h-24 font-mono text-sm`}
                placeholder={`O(n^2)\nO(n²)`}
              />
            </div>
          )}

          {form.type === "order" && (
            <>
              <div>
                <label className={labelClass}>
                  Elemente de ordonat — câte unul pe linie
                </label>

                <textarea
                  value={form.optionsText}
                  onChange={(e) => update("optionsText", e.target.value)}
                  className={`${textareaClass} h-28 font-mono text-sm`}
                  placeholder={`Alege pivotul\nPartiționează vectorul\nSortează partea stângă\nSortează partea dreaptă`}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Ordinea corectă — câte un element pe linie
                </label>

                <textarea
                  value={form.orderAnswerText}
                  onChange={(e) => update("orderAnswerText", e.target.value)}
                  className={`${textareaClass} h-28 font-mono text-sm`}
                  placeholder={`Alege pivotul\nPartiționează vectorul\nSortează partea stângă\nSortează partea dreaptă`}
                />
              </div>
            </>
          )}

          <div>
            <label className={labelClass}>Explicație după verificare</label>

            <textarea
              value={form.explanation}
              onChange={(e) => update("explanation", e.target.value)}
              className={`${textareaClass} h-24`}
              placeholder="Explică pe scurt de ce acesta este răspunsul corect."
            />
          </div>

          <button
            disabled={saving}
            className="rounded-xl bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-500 disabled:opacity-60"
          >
            {saving
              ? "Se salvează..."
              : editingId
              ? "Salvează modificările"
              : "Adaugă test"}
          </button>
        </form>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950 dark:text-zinc-100">
                Teste existente
              </h2>

              <p className="text-sm text-slate-600 dark:text-zinc-400">
                Gestionează testele salvate în baza de date.
              </p>
            </div>

            <button
              type="button"
              onClick={loadTests}
              className="w-fit rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950/60 dark:text-zinc-200 dark:hover:bg-slate-800"
            >
              Reîncarcă lista
            </button>
          </div>

          <div className="mb-4 grid gap-3 md:grid-cols-3">
            <input
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              placeholder="Caută după titlu, întrebare, algoritm..."
              className={fieldClass}
            />

            <select
              value={filters.category}
              onChange={(e) => updateFilter("category", e.target.value)}
              className={fieldClass}
            >
              <option value="all">Toate categoriile</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>

            <select
              value={filters.algorithmSlug}
              onChange={(e) => updateFilter("algorithmSlug", e.target.value)}
              className={fieldClass}
            >
              <option value="all">Toți algoritmii</option>
              {ALLOWED_SLUGS.map((slug) => (
                <option key={slug} value={slug}>
                  {LABELS[slug]}
                </option>
              ))}
            </select>

            <select
              value={filters.type}
              onChange={(e) => updateFilter("type", e.target.value)}
              className={fieldClass}
            >
              <option value="all">Toate tipurile</option>
              {TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>

            <select
              value={filters.difficulty}
              onChange={(e) => updateFilter("difficulty", e.target.value)}
              className={fieldClass}
            >
              <option value="all">Toate dificultățile</option>
              {DIFFICULTIES.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) => updateFilter("status", e.target.value)}
              className={fieldClass}
            >
              <option value="all">Toate statusurile</option>
              <option value="published">Publicate</option>
              <option value="draft">Nepublicate</option>
            </select>
          </div>

          {loadingTests ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950/50 dark:text-zinc-300">
              Se încarcă testele...
            </div>
          ) : filteredTests.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950/50 dark:text-zinc-300">
              Nu există teste pentru filtrele selectate.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTests.map((test) => (
                <div
                  key={test.id}
                  className={[
                    "rounded-2xl border p-4 transition",
                    editingId === test.id
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                      : "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40",
                  ].join(" ")}
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <span
                          className={[
                            "rounded-full border px-2.5 py-0.5 text-xs",
                            test.isPublished
                              ? "border-emerald-500/30 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200"
                              : "border-amber-500/30 bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
                          ].join(" ")}
                        >
                          {test.isPublished ? "Publicat" : "Nepublicat"}
                        </span>

                        <span className="rounded-full border border-indigo-500/30 bg-indigo-100 px-2.5 py-0.5 text-xs text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200">
                          {LABELS[test.algorithmSlug] || test.algorithmSlug}
                        </span>

                        <span className="rounded-full border border-slate-300 bg-white px-2.5 py-0.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-zinc-300">
                          {CATEGORY_LABELS[test.category] || test.category}
                        </span>

                        <span className="rounded-full border border-cyan-500/30 bg-cyan-100 px-2.5 py-0.5 text-xs text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-200">
                          {TYPE_LABELS[test.type] || test.type}
                        </span>

                        <span className="rounded-full border border-slate-300 bg-white px-2.5 py-0.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-zinc-300">
                          {DIFFICULTY_LABELS[test.difficulty] ||
                            test.difficulty}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-slate-950 dark:text-zinc-100">
                        {test.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-zinc-400">
                        {test.question}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <button
                        type="button"
                        onClick={() => startEdit(test)}
                        className="rounded-xl bg-indigo-600 px-3 py-2 text-sm text-white transition hover:bg-indigo-500"
                      >
                        Editează
                      </button>

                      <button
                        type="button"
                        onClick={() => togglePublished(test)}
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-zinc-200 dark:hover:bg-slate-800"
                      >
                        {test.isPublished ? "Ascunde" : "Publică"}
                      </button>

                      <button
                        type="button"
                        onClick={() => removeTest(test)}
                        className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-700 transition hover:bg-rose-500/20 dark:text-rose-200"
                      >
                        Șterge
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}