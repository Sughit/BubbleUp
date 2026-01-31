export default function About() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Despre proiect
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Documentație și prezentare generală a aplicației
          </p>
        </div>

        {/* Card mare */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6
                        shadow-[0_0_0_1px_rgba(99,102,241,0.15)]">
          <h2 className="text-lg font-semibold text-indigo-400 mb-2">
            Scopul proiectului
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Proiectul are ca scop realizarea unei aplicații educaționale interactive
            care permite învățarea algoritmilor de sortare prin simulări vizuale
            și explicații teoretice clare.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6
                          hover:border-indigo-400/40 transition">
            <h2 className="text-lg font-semibold text-indigo-400 mb-3">
              Tehnologii utilizate
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-zinc-300">
              <li>React</li>
              <li>JavaScript (ES6+)</li>
              <li>HTML & CSS</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6
                          hover:border-indigo-400/40 transition">
            <h2 className="text-lg font-semibold text-indigo-400 mb-3">
              Funcționalități
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-zinc-300">
              <li>Simulare vizuală algoritmi</li>
              <li>Control viteză execuție</li>
              <li>Execuție pas cu pas</li>
              <li>Afișare cod sursă</li>
            </ul>
          </div>

        </div>

        {/* Probleme + Viitor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h2 className="text-lg font-semibold text-indigo-400 mb-2">
              Probleme întâmpinate
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              Principalele dificultăți au fost gestionarea animațiilor,
              sincronizarea pașilor de sortare și adaptarea aplicației
              pentru modul light și dark.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h2 className="text-lg font-semibold text-indigo-400 mb-2">
              Dezvoltări viitoare
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              Aplicația poate fi extinsă cu teste interactive,
              statistici de performanță și suport pentru alte
              structuri de date.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4
                        text-sm text-zinc-400 text-center">
          Proiect realizat în cadrul atestatului de informatică
        </div>

      </div>
    </div>
  );
}