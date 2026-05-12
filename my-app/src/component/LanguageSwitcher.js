import React, { useEffect, useRef, useState } from "react";

const LANGUAGES = [
  { code: "ro", label: "Română", flag: "🇷🇴" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "hu", label: "Magyar", flag: "🇭🇺" },
];

function addGoogleTranslateScript() {
  if (document.getElementById("google-translate-script")) return;

  window.googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) return;

    new window.google.translate.TranslateElement(
      {
        pageLanguage: "ro",
        includedLanguages: LANGUAGES.map((l) => l.code).join(","),
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

function setGoogleTranslateCookie(lang) {
  const value = lang === "ro" ? "" : `/ro/${lang}`;

  document.cookie = `googtrans=${value}; path=/`;
  document.cookie = `googtrans=${value}; domain=${window.location.hostname}; path=/`;

  localStorage.setItem("bubbleup_lang", lang);

  window.location.reload();
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("bubbleup_lang") || "ro"
  );

  const boxRef = useRef(null);

  useEffect(() => {
    addGoogleTranslateScript();
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (!boxRef.current?.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const current =
    LANGUAGES.find((lang) => lang.code === currentLang) || LANGUAGES[0];

  return (
    <div ref={boxRef} className="relative">
      <div id="google_translate_element" className="hidden" />

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          rounded-xl border px-3 py-2 text-sm font-semibold shadow-sm transition
          border-slate-300 bg-white text-slate-800 hover:bg-slate-100
          dark:border-slate-700 dark:bg-slate-900 dark:text-zinc-100 dark:hover:bg-slate-800
        "
      >
        {current.flag} {current.label}
      </button>

      {open && (
        <div className="absolute right-0 z-[9999] mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setCurrentLang(lang.code);
                setGoogleTranslateCookie(lang.code);
              }}
              className={[
                "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition",
                currentLang === lang.code
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
                  : "text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-slate-800",
              ].join(" ")}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}