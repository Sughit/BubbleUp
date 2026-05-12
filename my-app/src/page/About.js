export default function About() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        {/* Header */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/50">
          <div className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200">
            BubbleUp — platformă educațională
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-zinc-100 md:text-4xl">
            Despre proiect
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-zinc-400 md:text-base">
            BubbleUp este o aplicație web interactivă creată pentru învățarea
            algoritmilor de sortare prin simulări vizuale, cod sursă, teorie și
            teste. Scopul aplicației este de a transforma conceptele algoritmice
            abstracte într-o experiență clară, practică și ușor de urmărit.
          </p>
        </div>

        {/* Scop */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-[0_0_0_1px_rgba(99,102,241,0.15)]">
          <h2 className="mb-2 text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Scopul proiectului
          </h2>

          <p className="leading-relaxed text-slate-700 dark:text-zinc-300">
            Proiectul are ca scop realizarea unei aplicații educaționale
            interactive care permite învățarea algoritmilor de sortare prin
            simulări vizuale și explicații teoretice clare. Utilizatorul poate
            observa în timp real modul în care valorile sunt comparate,
            interschimbate sau mutate, ceea ce facilitează înțelegerea legăturii
            dintre codul sursă și comportamentul algoritmului.
          </p>
        </div>

        {/* Tehnologii + Funcționalități */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-400/60 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-indigo-400/40">
            <h2 className="mb-3 text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              Tehnologii utilizate
            </h2>

            <ul className="space-y-2 text-sm text-slate-700 dark:text-zinc-300">
              <li>
                <span className="font-semibold text-slate-950 dark:text-zinc-100">
                  React
                </span>{" "}
                — construirea interfeței pe bază de componente reutilizabile.
              </li>
              <li>
                <span className="font-semibold text-slate-950 dark:text-zinc-100">
                  JavaScript
                </span>{" "}
                — logica aplicației, simulări și interacțiuni dinamice.
              </li>
              <li>
                <span className="font-semibold text-slate-950 dark:text-zinc-100">
                  Tailwind CSS
                </span>{" "}
                — stilizare rapidă, responsive și modernă.
              </li>
              <li>
                <span className="font-semibold text-slate-950 dark:text-zinc-100">
                  Firebase
                </span>{" "}
                — autentificare admin și stocarea testelor.
              </li>
              <li>
                <span className="font-semibold text-slate-950 dark:text-zinc-100">
                  Vercel
                </span>{" "}
                — publicarea aplicației online.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-400/60 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-indigo-400/40">
            <h2 className="mb-3 text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              Funcționalități principale
            </h2>

            <ul className="space-y-2 text-sm text-slate-700 dark:text-zinc-300">
              <li>Simulare vizuală pentru algoritmi de sortare.</li>
              <li>Control al vitezei de execuție.</li>
              <li>Execuție automată sau pas cu pas.</li>
              <li>Introducerea unui vector personalizat.</li>
              <li>Generarea aleatorie a valorilor.</li>
              <li>Afișarea codului sursă în C++, Java și Python.</li>
              <li>Teste interactive organizate pe categorii.</li>
              <li>Panou de administrare pentru adăugarea testelor.</li>
              <li>Mod luminos și mod întunecat.</li>
            </ul>
          </div>
        </div>

        {/* Proces */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/40">
          <h2 className="mb-4 text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            Cum se parcurge aplicația
          </h2>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {[
              ["1", "Alegere categorie", "Utilizatorul selectează o categorie de sortări."],
              ["2", "Alegere algoritm", "Se alege algoritmul dorit din cardurile disponibile."],
              ["3", "Simulare", "Algoritmul este urmărit vizual, pas cu pas."],
              ["4", "Cod și teorie", "Se analizează implementarea și noțiunile teoretice."],
              ["5", "Teste", "Utilizatorul își verifică înțelegerea prin exerciții."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {number}
                </div>
                <h3 className="text-sm font-semibold text-slate-950 dark:text-zinc-100">
                  {title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Probleme + Dezvoltări */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/40">
            <h2 className="mb-2 text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              Probleme întâmpinate
            </h2>

            <p className="leading-relaxed text-slate-700 dark:text-zinc-300">
              Principalele dificultăți au fost gestionarea animațiilor,
              sincronizarea pașilor de sortare cu evidențierea codului,
              organizarea testelor în Firebase și adaptarea interfeței pentru
              modul luminos și modul întunecat. De asemenea, a fost necesară
              optimizarea componentelor pentru ca simulările să rămână fluide și
              ușor de urmărit.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/40">
            <h2 className="mb-2 text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              Dezvoltări viitoare
            </h2>

            <p className="leading-relaxed text-slate-700 dark:text-zinc-300">
              Aplicația poate fi extinsă prin adăugarea unui modul de comparare
              între algoritmi, a unui sistem de progres pentru utilizatori, a
              unui mod de examinare și a unor lecții interactive mai detaliate.
              De asemenea, pot fi adăugate rapoarte de simulare, traducere
              automată mai performantă și optimizări pentru seturi mai mari de
              date.
            </p>
          </div>
        </div>

        {/* Concluzie */}
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-100 p-6 shadow-sm dark:bg-indigo-500/10">
          <h2 className="mb-2 text-lg font-semibold text-indigo-700 dark:text-indigo-200">
            Concluzie
          </h2>

          <p className="leading-relaxed text-indigo-900 dark:text-indigo-100/90">
            BubbleUp combină simularea vizuală, teoria, codul sursă și testarea
            interactivă într-o singură aplicație. Prin această abordare,
            proiectul devine un instrument util pentru elevii care doresc să
            înțeleagă algoritmii de sortare într-un mod practic, modern și
            accesibil.
          </p>
        </div>
      </div>
    </div>
  );
}