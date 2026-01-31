export default function Theory() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Algoritmi de sortare — Teorie
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Noțiuni teoretice și criterii de comparație.
          </p>
        </div>

        {/* Ce este sortarea */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold text-indigo-400 mb-2">
            1. Ce este un algoritm de sortare
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Un algoritm de sortare este o metodă prin care elementele unei colecții
            sunt rearanjate într-o ordine bine definită, de regulă crescătoare sau
            descrescătoare. Sortarea este esențială în informatică, fiind utilizată
            în căutare, analiză de date și optimizare.
          </p>
        </div>

        {/* Clasificare */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold text-indigo-400 mb-3">
            2. Clasificarea algoritmilor de sortare
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-zinc-300">
            <li>după complexitate: algoritmi simpli și algoritmi eficienți</li>
            <li>după stabilitate: stabili și instabili</li>
            <li>după utilizarea memoriei: in-place sau cu memorie auxiliară</li>
            <li>după metodă: prin comparație sau distribuționali</li>
          </ul>
        </div>

        {/* Stabilitate + In-place */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h2 className="text-lg font-semibold text-indigo-400 mb-2">
              3. Stabilitatea algoritmilor
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              Un algoritm este stabil dacă păstrează ordinea relativă a elementelor
              egale. Stabilitatea este importantă atunci când datele conțin mai
              multe câmpuri ce trebuie sortate succesiv.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h2 className="text-lg font-semibold text-indigo-400 mb-2">
              4. Sortare in-place
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              Algoritmii in-place folosesc o cantitate minimă de memorie suplimentară,
              în timp ce alți algoritmi necesită spațiu auxiliar proporțional cu
              dimensiunea datelor.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold text-indigo-400 mb-2">
            5. Clasificarea după metodă
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Un algoritm de sortare poate fi clasificat după metoda utilizată pentru
            ordonarea elementelor. Astfel, există algoritmi de sortare prin comparație,
            care stabilesc ordinea elementelor prin comparații directe între valori, și
            algoritmi de sortare distribuționali, care folosesc proprietăți ale datelor
            pentru a le grupa, fără a realiza comparații directe.
          </p>
        </div>

        {/* Tabel comparativ */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
          <div className="border-b border-slate-800 px-6 py-4">
            <h2 className="text-lg font-semibold text-indigo-400">
              6. Tabel comparativ al algoritmilor
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-900">
                <tr className="text-zinc-300">
                  <th className="px-4 py-3 text-left">Algoritm</th>
                  <th className="px-4 py-3 text-center">Best</th>
                  <th className="px-4 py-3 text-center">Average</th>
                  <th className="px-4 py-3 text-center">Worst</th>
                  <th className="px-4 py-3 text-center">Stabil</th>
                  <th className="px-4 py-3 text-center">In-place</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-zinc-300">
                {[
                  ["Bubble Sort", "O(n)", "O(n²)", "O(n²)", "Da", "Da"],
                  ["Insertion Sort", "O(n)", "O(n²)", "O(n²)", "Da", "Da"],
                  ["Selection Sort", "O(n²)", "O(n²)", "O(n²)", "Nu", "Da"],
                  ["Quick Sort", "O(n log n)", "O(n log n)", "O(n²)", "Nu", "Da"],
                  ["Merge Sort", "O(n log n)", "O(n log n)", "O(n log n)", "Da", "Nu"],
                  ["Heap Sort", "O(n log n)", "O(n log n)", "O(n log n)", "Nu", "Da"],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-center">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}