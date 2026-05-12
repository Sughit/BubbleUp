export const THEORY_CATEGORIES = [
  { id: "all", label: "Toate" },
  { id: "basics", label: "Noțiuni de bază" },
  { id: "complexity", label: "Complexitate" },
  { id: "properties", label: "Proprietăți" },
  { id: "algorithms", label: "Algoritmi" },
  { id: "practical", label: "Aplicare practică" },
];

export const THEORY_SECTIONS = [
  {
    id: "what-is-sorting",
    category: "basics",
    level: "Începător",
    title: "Ce este sortarea?",
    summary:
      "Sortarea este procesul prin care elementele unei colecții sunt rearanjate într-o ordine bine definită.",
    content: [
      "În informatică, sortarea este una dintre cele mai utilizate operații asupra datelor. Ea apare în aplicații simple, precum afișarea alfabetică a unor nume, dar și în sisteme complexe, precum baze de date, motoare de căutare sau aplicații de analiză.",
      "Un algoritm de sortare primește o colecție de valori și o transformă astfel încât elementele să respecte o anumită ordine: crescătoare, descrescătoare sau după o regulă personalizată.",
      "De exemplu, vectorul [7, 2, 9, 1] devine [1, 2, 7, 9] dacă sortarea se face crescător.",
    ],
    example: "Vector inițial: [5, 1, 4, 2] → Vector sortat: [1, 2, 4, 5]",
  },
  {
    id: "why-sorting-matters",
    category: "basics",
    level: "Începător",
    title: "De ce este importantă sortarea?",
    summary:
      "Datele sortate pot fi căutate, comparate și procesate mai eficient.",
    content: [
      "Sortarea nu este importantă doar pentru aspectul vizual al datelor, ci și pentru eficiența algoritmilor care urmează să lucreze cu acele date.",
      "De exemplu, căutarea binară funcționează doar pe date sortate și este mult mai rapidă decât parcurgerea element cu element.",
      "În baze de date, sortarea ajută la afișarea rezultatelor după criterii precum dată, nume, preț sau relevanță.",
    ],
    example:
      "Dacă o listă de produse este sortată după preț, utilizatorul poate identifica rapid cele mai ieftine sau cele mai scumpe produse.",
  },
  {
    id: "comparison-sorting",
    category: "basics",
    level: "Începător",
    title: "Sortare prin comparație",
    summary:
      "Algoritmii prin comparație decid ordinea elementelor comparând direct două valori.",
    content: [
      "Majoritatea algoritmilor cunoscuți de sortare sunt algoritmi prin comparație. Ei compară două elemente și decid dacă trebuie schimbate între ele.",
      "Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort și Heap Sort sunt exemple de algoritmi prin comparație.",
      "Acești algoritmi sunt generali, deoarece pot sorta orice tip de date pentru care se poate defini o relație de ordine.",
    ],
    example:
      "În Bubble Sort, dacă a[j] > a[j + 1], cele două elemente sunt interschimbate.",
  },
  {
    id: "distribution-sorting",
    category: "basics",
    level: "Mediu",
    title: "Sortare distribuțională",
    summary:
      "Algoritmii distribuționali folosesc proprietățile valorilor, nu doar comparații directe.",
    content: [
      "Algoritmii distribuționali sunt folosiți atunci când datele au anumite proprietăți speciale, de exemplu valori întregi într-un interval limitat.",
      "Counting Sort, Radix Sort, Bucket Sort și Pigeonhole Sort sunt exemple de algoritmi distribuționali.",
      "Acești algoritmi pot ajunge la complexități foarte bune, precum O(n + k), dar nu sunt potriviți pentru orice tip de date.",
    ],
    example:
      "Dacă toate notele sunt între 1 și 10, Counting Sort poate număra aparițiile fiecărei note și poate reconstrui rapid vectorul sortat.",
  },
  {
    id: "time-complexity",
    category: "complexity",
    level: "Mediu",
    title: "Complexitatea timp",
    summary:
      "Complexitatea timp descrie cum crește durata de execuție în funcție de numărul de elemente.",
    content: [
      "Complexitatea timp este notată de obicei cu O mare, de exemplu O(n), O(n²) sau O(n log n).",
      "O(n) înseamnă că timpul crește aproximativ proporțional cu numărul de elemente. O(n²) înseamnă că timpul crește mult mai rapid, deoarece apar de obicei două parcurgeri imbricate.",
      "Algoritmii simpli, precum Bubble Sort sau Selection Sort, au de obicei complexitate O(n²), în timp ce algoritmii eficienți, precum Merge Sort sau Heap Sort, au O(n log n).",
    ],
    example:
      "Pentru 1000 de elemente, un algoritm O(n²) poate face aproximativ 1.000.000 de operații, în timp ce unul O(n log n) face mult mai puține.",
  },
  {
    id: "space-complexity",
    category: "complexity",
    level: "Mediu",
    title: "Complexitatea spațiu",
    summary:
      "Complexitatea spațiu arată câtă memorie suplimentară folosește un algoritm.",
    content: [
      "Unii algoritmi sortează direct în vectorul inițial și folosesc foarte puțină memorie suplimentară. Aceștia sunt numiți algoritmi in-place.",
      "Alți algoritmi au nevoie de vectori auxiliari, liste temporare sau structuri de numărare.",
      "De exemplu, Merge Sort are nevoie de memorie auxiliară O(n), iar Counting Sort are nevoie de O(k), unde k este dimensiunea intervalului de valori.",
    ],
    example:
      "Dacă sortăm 1000 de numere cu Merge Sort, algoritmul poate folosi un vector auxiliar de aproximativ aceeași dimensiune.",
  },
  {
    id: "best-average-worst",
    category: "complexity",
    level: "Mediu",
    title: "Best case, average case și worst case",
    summary:
      "Un algoritm poate avea comportamente diferite în funcție de forma datelor de intrare.",
    content: [
      "Best case reprezintă situația cea mai favorabilă pentru algoritm. Average case descrie comportamentul mediu, iar worst case reprezintă situația cea mai nefavorabilă.",
      "Bubble Sort optimizat poate avea O(n) în cazul în care vectorul este deja sortat, deoarece detectează că nu mai sunt necesare interschimbări.",
      "Quick Sort are în medie O(n log n), dar poate ajunge la O(n²) dacă pivotul este ales prost în mod repetat.",
    ],
    example:
      "Pentru vectorul [1, 2, 3, 4], Insertion Sort are un comportament foarte bun, deoarece elementele sunt deja la locul lor.",
  },
  {
    id: "stability",
    category: "properties",
    level: "Mediu",
    title: "Stabilitatea algoritmilor",
    summary:
      "Un algoritm este stabil dacă păstrează ordinea relativă a elementelor egale.",
    content: [
      "Stabilitatea este importantă atunci când elementele au mai multe câmpuri sau criterii de sortare.",
      "De exemplu, dacă sortăm elevii după clasă și apoi după nume, un algoritm stabil poate păstra ordinea obținută anterior pentru elementele egale.",
      "Bubble Sort, Insertion Sort, Merge Sort, Counting Sort și Radix Sort pot fi stabile. Selection Sort, Quick Sort și Heap Sort sunt de obicei instabile.",
    ],
    example:
      "Dacă două produse au același preț, un algoritm stabil le păstrează în ordinea în care apăreau inițial.",
  },
  {
    id: "in-place",
    category: "properties",
    level: "Începător",
    title: "Sortare in-place",
    summary:
      "Un algoritm in-place folosește foarte puțină memorie suplimentară.",
    content: [
      "Un algoritm este considerat in-place dacă modifică direct colecția inițială și nu creează o copie completă a acesteia.",
      "Bubble Sort, Selection Sort, Insertion Sort, Quick Sort și Heap Sort sunt considerate in-place în implementările clasice.",
      "Merge Sort nu este in-place în varianta clasică, deoarece folosește vectori auxiliari pentru interclasare.",
    ],
    example:
      "Selection Sort sortează vectorul prin alegerea minimului și schimbarea lui direct în vectorul inițial.",
  },
  {
    id: "adaptive",
    category: "properties",
    level: "Mediu",
    title: "Algoritmi adaptivi",
    summary:
      "Un algoritm adaptiv funcționează mai bine atunci când datele sunt deja parțial sortate.",
    content: [
      "Algoritmii adaptivi profită de ordinea existentă în date.",
      "Insertion Sort este un exemplu foarte bun: dacă vectorul este aproape sortat, el face puține mutări și devine eficient.",
      "Bubble Sort cu optimizare prin flag poate opri execuția mai devreme dacă observă că nu s-au mai făcut interschimbări.",
    ],
    example:
      "Pentru [1, 2, 3, 5, 4], Insertion Sort corectează rapid doar ultima inversiune.",
  },
  {
    id: "bubble-sort",
    category: "algorithms",
    level: "Începător",
    title: "Bubble Sort",
    summary:
      "Bubble Sort compară elemente vecine și le interschimbă dacă sunt în ordine greșită.",
    content: [
      "Bubble Sort este unul dintre cei mai simpli algoritmi de sortare. El parcurge vectorul de mai multe ori și mută treptat elementele mari spre final.",
      "La fiecare pas, se compară două elemente vecine. Dacă primul este mai mare decât al doilea, ele sunt interschimbate.",
      "Este ușor de înțeles și foarte bun pentru demonstrații vizuale, dar este ineficient pentru vectori mari.",
    ],
    example:
      "[5, 2, 4] → comparăm 5 și 2 → [2, 5, 4] → comparăm 5 și 4 → [2, 4, 5]",
  },
  {
    id: "selection-sort",
    category: "algorithms",
    level: "Începător",
    title: "Selection Sort",
    summary:
      "Selection Sort caută minimul și îl pune pe poziția corectă.",
    content: [
      "Selection Sort împarte vectorul în două zone: zona sortată și zona nesortată.",
      "La fiecare pas, caută cel mai mic element din zona nesortată și îl mută pe prima poziție liberă.",
      "Face puține interschimbări, dar tot are O(n²), deoarece caută minimul prin parcurgere.",
    ],
    example:
      "[4, 2, 7, 1] → minimul este 1 → [1, 2, 7, 4]",
  },
  {
    id: "insertion-sort",
    category: "algorithms",
    level: "Începător",
    title: "Insertion Sort",
    summary:
      "Insertion Sort inserează fiecare element în poziția corectă din partea deja sortată.",
    content: [
      "Insertion Sort funcționează asemănător cu modul în care ordonăm cărțile în mână.",
      "Pornim de la o zonă sortată formată din primul element, apoi luăm fiecare element următor și îl inserăm la locul potrivit.",
      "Este foarte eficient pentru date puține sau aproape sortate.",
    ],
    example:
      "[2, 5, 1] → 2 și 5 sunt ordonate → inserăm 1 înaintea lui 2 → [1, 2, 5]",
  },
  {
    id: "merge-sort",
    category: "algorithms",
    level: "Mediu",
    title: "Merge Sort",
    summary:
      "Merge Sort împarte vectorul în jumătăți, sortează recursiv și interclasează rezultatele.",
    content: [
      "Merge Sort folosește metoda divide et impera. Vectorul este împărțit în două jumătăți până când se ajunge la secvențe de lungime 1.",
      "Apoi, secvențele sunt combinate prin interclasare, rezultând treptat un vector sortat.",
      "Are complexitate O(n log n) în toate cazurile, dar folosește memorie suplimentară O(n).",
    ],
    example:
      "[4, 1, 3, 2] → [4, 1] și [3, 2] → [1, 4] și [2, 3] → [1, 2, 3, 4]",
  },
  {
    id: "quick-sort",
    category: "algorithms",
    level: "Mediu",
    title: "Quick Sort",
    summary:
      "Quick Sort alege un pivot și împarte elementele în valori mai mici și mai mari decât pivotul.",
    content: [
      "Quick Sort este un algoritm eficient și foarte folosit în practică.",
      "El alege un pivot, apoi rearanjează vectorul astfel încât elementele mai mici să fie într-o parte, iar cele mai mari în cealaltă parte.",
      "În medie are O(n log n), dar în cel mai rău caz poate ajunge la O(n²).",
    ],
    example:
      "Pentru pivotul 5, valorile mai mici merg în stânga, iar cele mai mari în dreapta.",
  },
  {
    id: "heap-sort",
    category: "algorithms",
    level: "Avansat",
    title: "Heap Sort",
    summary:
      "Heap Sort folosește o structură de tip heap pentru a extrage repetat elementul maxim.",
    content: [
      "Heap Sort transformă vectorul într-un heap maxim, unde elementul cel mai mare se află în rădăcină.",
      "Apoi, elementul maxim este mutat la final, iar heap-ul este refăcut pentru restul elementelor.",
      "Are O(n log n) în toate cazurile și este in-place, dar nu este stabil.",
    ],
    example:
      "După construirea heap-ului, maximul este extras și pus pe ultima poziție.",
  },
  {
    id: "counting-sort",
    category: "algorithms",
    level: "Mediu",
    title: "Counting Sort",
    summary:
      "Counting Sort numără aparițiile fiecărei valori și reconstruiește vectorul sortat.",
    content: [
      "Counting Sort este foarte eficient atunci când valorile sunt întregi și aparțin unui interval mic.",
      "În loc să compare elementele între ele, algoritmul creează un vector de frecvență.",
      "Complexitatea este O(n + k), unde n este numărul de elemente, iar k este dimensiunea intervalului de valori.",
    ],
    example:
      "Pentru valori între 0 și 9, algoritmul numără câte apariții are fiecare cifră.",
  },
  {
    id: "radix-sort",
    category: "algorithms",
    level: "Avansat",
    title: "Radix Sort",
    summary:
      "Radix Sort sortează numerele pe cifre, de la cea mai puțin semnificativă la cea mai semnificativă.",
    content: [
      "Radix Sort este folosit pentru sortarea numerelor sau șirurilor de caractere cu lungime controlată.",
      "De obicei, folosește Counting Sort ca algoritm stabil pentru fiecare cifră.",
      "Poate fi foarte eficient, dar necesită ca datele să aibă o reprezentare potrivită pe cifre sau caractere.",
    ],
    example:
      "Numerele pot fi sortate întâi după unități, apoi după zeci, apoi după sute.",
  },
  {
    id: "choosing-algorithm",
    category: "practical",
    level: "Mediu",
    title: "Cum alegem algoritmul potrivit?",
    summary:
      "Alegerea depinde de dimensiunea datelor, memorie, stabilitate și tipul valorilor.",
    content: [
      "Nu există un singur algoritm perfect pentru toate situațiile.",
      "Pentru date puține sau aproape sortate, Insertion Sort poate fi o alegere foarte bună.",
      "Pentru date multe, Merge Sort, Quick Sort sau Heap Sort sunt mai potrivite.",
      "Pentru valori întregi într-un interval mic, Counting Sort poate fi mai rapid decât algoritmii prin comparație.",
    ],
    example:
      "Dacă ai note între 1 și 10 pentru foarte mulți elevi, Counting Sort este o alegere eficientă.",
  },
  {
    id: "common-mistakes",
    category: "practical",
    level: "Începător",
    title: "Greșeli frecvente",
    summary:
      "Cele mai comune greșeli apar la indici, condiții de oprire și interpretarea complexității.",
    content: [
      "O greșeală frecventă este folosirea incorectă a limitelor în bucle, de exemplu accesarea lui a[j + 1] când j este deja pe ultima poziție.",
      "Altă greșeală este confundarea numărului de interschimbări cu numărul de comparații.",
      "De asemenea, mulți elevi cred că un algoritm cu mai puține linii de cod este automat mai eficient, dar eficiența se analizează prin complexitate.",
    ],
    example:
      "În Bubble Sort, bucla interioară trebuie să se oprească înainte de ultima poziție nesortată.",
  },
];

export const ALGORITHM_THEORY = [
  {
    slug: "bubble",
    name: "Bubble Sort",
    category: "Sortare simplă",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    memory: "O(1)",
    stable: true,
    inPlace: true,
    useWhen: "Pentru explicații vizuale și date foarte mici.",
    avoidWhen: "Pentru vectori mari.",
  },
  {
    slug: "selection",
    name: "Selection Sort",
    category: "Sortare simplă",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    memory: "O(1)",
    stable: false,
    inPlace: true,
    useWhen: "Când vrei puține interschimbări.",
    avoidWhen: "Când ai nevoie de stabilitate sau eficiență mare.",
  },
  {
    slug: "insertion",
    name: "Insertion Sort",
    category: "Sortare simplă",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    memory: "O(1)",
    stable: true,
    inPlace: true,
    useWhen: "Pentru date puține sau aproape sortate.",
    avoidWhen: "Pentru vectori mari complet dezordonați.",
  },
  {
    slug: "merge",
    name: "Merge Sort",
    category: "Sortare eficientă",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    memory: "O(n)",
    stable: true,
    inPlace: false,
    useWhen: "Când ai nevoie de stabilitate și timp garantat.",
    avoidWhen: "Când memoria auxiliară este foarte limitată.",
  },
  {
    slug: "quick",
    name: "Quick Sort",
    category: "Sortare eficientă",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    memory: "O(log n)",
    stable: false,
    inPlace: true,
    useWhen: "Pentru performanță foarte bună în practică.",
    avoidWhen: "Când worst case-ul trebuie evitat complet.",
  },
  {
    slug: "heap",
    name: "Heap Sort",
    category: "Sortare eficientă",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    memory: "O(1)",
    stable: false,
    inPlace: true,
    useWhen: "Când vrei timp garantat și memorie redusă.",
    avoidWhen: "Când ai nevoie de stabilitate.",
  },
  {
    slug: "counting",
    name: "Counting Sort",
    category: "Sortare liniară",
    best: "O(n + k)",
    average: "O(n + k)",
    worst: "O(n + k)",
    memory: "O(k)",
    stable: true,
    inPlace: false,
    useWhen: "Pentru numere întregi într-un interval mic.",
    avoidWhen: "Când valorile sunt foarte mari sau dispersate.",
  },
  {
    slug: "radix",
    name: "Radix Sort",
    category: "Sortare liniară",
    best: "O(n · d)",
    average: "O(n · d)",
    worst: "O(n · d)",
    memory: "O(n + k)",
    stable: true,
    inPlace: false,
    useWhen: "Pentru numere sau șiruri cu lungime controlată.",
    avoidWhen: "Când datele nu pot fi împărțite pe cifre/caractere.",
  },
];

export const GLOSSARY = [
  {
    term: "Algoritm",
    definition:
      "O succesiune finită de pași prin care se rezolvă o problemă.",
  },
  {
    term: "Vector",
    definition:
      "O colecție liniară de elemente, accesate de obicei prin indici.",
  },
  {
    term: "Comparație",
    definition:
      "Operația prin care două elemente sunt analizate pentru a stabili ordinea lor.",
  },
  {
    term: "Interschimbare",
    definition:
      "Operația prin care două elemente își schimbă pozițiile.",
  },
  {
    term: "Stabilitate",
    definition:
      "Proprietatea unui algoritm de a păstra ordinea relativă a elementelor egale.",
  },
  {
    term: "In-place",
    definition:
      "Proprietatea unui algoritm de a folosi memorie auxiliară foarte mică.",
  },
  {
    term: "Complexitate",
    definition:
      "O estimare a resurselor necesare unui algoritm, de obicei timp sau memorie.",
  },
  {
    term: "Divide et impera",
    definition:
      "Metodă prin care problema este împărțită în subprobleme mai mici, rezolvate separat.",
  },
];

export const RECOMMENDATIONS = [
  {
    situation: "Date foarte puține",
    recommended: "Insertion Sort / Bubble Sort",
    reason:
      "Sunt simple, ușor de urmărit și suficient de rapide pentru dimensiuni mici.",
  },
  {
    situation: "Date aproape sortate",
    recommended: "Insertion Sort",
    reason:
      "Profită de ordinea deja existentă și poate ajunge aproape de O(n).",
  },
  {
    situation: "Date multe, stabilitate necesară",
    recommended: "Merge Sort",
    reason:
      "Are O(n log n) garantat și poate fi implementat stabil.",
  },
  {
    situation: "Date multe, memorie redusă",
    recommended: "Heap Sort",
    reason:
      "Are O(n log n) în toate cazurile și folosește memorie auxiliară O(1).",
  },
  {
    situation: "Numere întregi într-un interval mic",
    recommended: "Counting Sort",
    reason:
      "Nu compară elementele direct și poate obține complexitate O(n + k).",
  },
  {
    situation: "Performanță bună în practică",
    recommended: "Quick Sort",
    reason:
      "Este foarte rapid în medie, mai ales cu alegere bună a pivotului.",
  },
];