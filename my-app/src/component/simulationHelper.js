// src/pages/simulationHelper.js
/* Toată logica: labels, parsing, generatoare, aliasuri, utilitare */

export const DEFAULT_DATA = [8, 6, 4, 9, 5, 2, 7, 3];

export const LABELS = {
  bubble: "Bubble Sort",
  selection: "Selection Sort",
  insertion: "Insertion Sort",
  gnome: "Gnome Sort",
  cocktail: "Cocktail Shaker Sort",
  oddeven: "Odd–Even (Brick) Sort",
  shell: "Shell Sort",
  comb: "Comb Sort",
  merge: "Merge Sort",
  quick: "Quick Sort",
  heap: "Heap Sort",
  counting: "Counting Sort",
  radix: "Radix Sort (LSD)",
  bucket: "Bucket Sort",
  pigeonhole: "Pigeonhole Sort",
  stooge: "Stooge Sort",
  intro: "Intro Sort",
  tim: "Tim Sort",
  flash: "Flash Sort",
};

export const ALLOWED_SLUGS = Object.keys(LABELS);

export const parseNumbers = (txt) => {
  const parts = txt
    .replace(/[;\n]/g, " ")
    .split(/[ ,\t]+/)
    .filter(Boolean)
    .map(Number)
    .filter((x) => Number.isFinite(x));
  return parts.length ? parts : DEFAULT_DATA;
};

const cappedNonNeg = (arr) => arr.map((v) => Math.max(0, Math.floor(v)));

/* ============== Generatoare ============== */
function* bubbleSort(base) {
  const arr = base.slice();
  const n = arr.length;
  let swapped = true;
  for (let i = 0; i < n - 1 && swapped; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      yield { arr: arr.slice(), hi: { a: j, b: j + 1, range: [n - i, n - 1] } };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [n - i - 1, n - 1] } };
  }
  yield { arr, hi: { a: -1, b: -1, range: [0, n - 1] } };
}

function* selectionSort(base) {
  const arr = base.slice();
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      yield { arr: arr.slice(), hi: { a: min, b: j, range: [0, i - 1] } };
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];
    yield { arr: arr.slice(), hi: { a: i, b: min, range: [0, i] } };
  }
  yield { arr, hi: { a: -1, b: -1, range: [0, n - 1] } };
}

function* insertionSort(base) {
  const arr = base.slice();
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i],
      j = i - 1;
    yield { arr: arr.slice(), hi: { a: i, b: j, range: [0, i - 1] } };
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      yield { arr: arr.slice(), hi: { a: j, b: j + 1, range: [0, i] } };
    }
    arr[j + 1] = key;
    yield { arr: arr.slice(), hi: { a: j + 1, b: -1, range: [0, i] } };
  }
  yield { arr, hi: { a: -1, b: -1, range: [0, n - 1] } };
}

function* gnomeSort(base) {
  const arr = base.slice();
  let i = 1;
  while (i < arr.length) {
    yield { arr: arr.slice(), hi: { a: i - 1, b: i, range: [] } };
    if (i === 0 || arr[i] >= arr[i - 1]) i++;
    else {
      [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
      i--;
    }
  }
  yield { arr, hi: { a: -1, b: -1, range: [0, arr.length - 1] } };
}

function* cocktailSort(base) {
  const arr = base.slice();
  let start = 0,
    end = arr.length - 1,
    swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      yield { arr: arr.slice(), hi: { a: i, b: i + 1, range: [end + 1, arr.length - 1] } };
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    end--;
    if (!swapped) break;
    for (let i = end; i > start; i--) {
      yield { arr: arr.slice(), hi: { a: i - 1, b: i, range: [0, start - 1] } };
      if (arr[i] < arr[i - 1]) {
        [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
        swapped = true;
      }
    }
    start++;
    yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [start, end] } };
  }
  yield { arr, hi: { a: -1, b: -1, range: [0, arr.length - 1] } };
}

function* oddEvenSort(base) {
  const arr = base.slice();
  let sorted = false,
    n = arr.length;
  while (!sorted) {
    sorted = true;
    for (let i = 1; i <= n - 2; i += 2) {
      yield { arr: arr.slice(), hi: { a: i, b: i + 1, range: [] } };
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }
    for (let i = 0; i <= n - 2; i += 2) {
      yield { arr: arr.slice(), hi: { a: i, b: i + 1, range: [] } };
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }
  }
  yield { arr, hi: { a: -1, b: -1, range: [0, n - 1] } };
}

function* shellSort(base) {
  const arr = base.slice();
  const n = arr.length;
  let gap = 1;
  while (gap < n / 3) gap = 3 * gap + 1; // Knuth
  while (gap >= 1) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i],
        j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
        yield { arr: arr.slice(), hi: { a: j, b: j + gap, range: [] } };
      }
      arr[j] = temp;
      yield { arr: arr.slice(), hi: { a: j, b: i, range: [] } };
    }
    gap = Math.floor(gap / 3);
  }
  yield { arr, hi: { a: -1, b: -1, range: [0, n - 1] } };
}

function* combSort(base) {
  const arr = base.slice();
  const n = arr.length;
  let gap = n,
    swapped = true;
  const shrink = 1.3;
  while (gap > 1 || swapped) {
    gap = Math.max(1, Math.floor(gap / shrink));
    swapped = false;
    for (let i = 0; i + gap < n; i++) {
      yield { arr: arr.slice(), hi: { a: i, b: i + gap, range: [] } };
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        swapped = true;
      }
    }
  }
  yield { arr, hi: { a: -1, b: -1, range: [0, n - 1] } };
}

function* mergeSort(base) {
  const arr = base.slice();
  const frames = [];
  const merge = (l, m, r) => {
    const L = arr.slice(l, m + 1),
      R = arr.slice(m + 1, r + 1);
    let i = 0,
      j = 0,
      k = l;
    while (i < L.length && j < R.length) {
      frames.push({ arr: arr.slice(), hi: { a: l + i, b: m + 1 + j, range: [l, r] } });
      arr[k++] = L[i] <= R[j] ? L[i++] : R[j++];
      frames.push({ arr: arr.slice(), hi: { a: k - 1, b: -1, range: [l, r] } });
    }
    while (i < L.length) {
      arr[k++] = L[i++];
      frames.push({ arr: arr.slice(), hi: { a: k - 1, b: -1, range: [l, r] } });
    }
    while (j < R.length) {
      arr[k++] = R[j++];
      frames.push({ arr: arr.slice(), hi: { a: k - 1, b: -1, range: [l, r] } });
    }
  };
  const sort = (l, r) => {
    if (l >= r) return;
    const m = (l + r) >> 1;
    sort(l, m);
    sort(m + 1, r);
    merge(l, m, r);
  };
  sort(0, arr.length - 1);
  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [0, arr.length - 1] } });
  for (const f of frames) yield f;
}

function* quickSort(base) {
  const arr = base.slice();
  const frames = [];
  const qs = (l, r) => {
    if (l >= r) return;
    const pivot = arr[r];
    let i = l;
    for (let j = l; j < r; j++) {
      frames.push({ arr: arr.slice(), hi: { a: j, b: r, range: [l, r] } });
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        frames.push({ arr: arr.slice(), hi: { a: i, b: j, range: [l, r] } });
        i++;
      }
    }
    [arr[i], arr[r]] = [arr[r], arr[i]];
    frames.push({ arr: arr.slice(), hi: { a: i, b: r, range: [l, r] } });
    qs(l, i - 1);
    qs(i + 1, r);
  };
  qs(0, arr.length - 1);
  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [0, arr.length - 1] } });
  for (const f of frames) yield f;
}

function* heapSort(base) {
  const arr = base.slice();
  const n = arr.length;
  const frames = [];
  const heapify = (n, i, endMark) => {
    let largest = i,
      l = 2 * i + 1,
      r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    frames.push({ arr: arr.slice(), hi: { a: i, b: largest, range: [endMark, n - 1] } });
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      frames.push({ arr: arr.slice(), hi: { a: i, b: largest, range: [endMark, n - 1] } });
      heapify(n, largest, endMark);
    }
  };
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i, n);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    frames.push({ arr: arr.slice(), hi: { a: 0, b: i, range: [i, n - 1] } });
    heapify(i, 0, i);
  }
  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [0, n - 1] } });
  for (const f of frames) yield f;
}

function* countingSort(base) {
  const arr = cappedNonNeg(base);
  const k = Math.max(...arr, 0);
  const count = Array(k + 1).fill(0);
  const frames = [];
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
    frames.push({ arr: arr.slice(), hi: { a: i, b: -1, range: [] } });
  }
  let idx = 0;
  for (let v = 0; v <= k; v++) {
    while (count[v]-- > 0) {
      arr[idx++] = v;
      frames.push({ arr: arr.slice(), hi: { a: idx - 1, b: -1, range: [] } });
    }
  }
  frames.push({ arr, hi: { a: -1, b: -1, range: [0, arr.length - 1] } });
  for (const f of frames) yield f;
}

function* radixSortLSD(base) {
  const arr = cappedNonNeg(base);
  const frames = [];
  let max = Math.max(...arr, 0);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const out = Array(arr.length).fill(0),
      count = Array(10).fill(0);
    for (const x of arr) count[Math.floor(x / exp) % 10]++;
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    for (let i = arr.length - 1; i >= 0; i--) {
      const d = Math.floor(arr[i] / exp) % 10;
      out[--count[d]] = arr[i];
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i] = out[i];
      frames.push({ arr: arr.slice(), hi: { a: i, b: -1, range: [] } });
    }
  }
  frames.push({ arr, hi: { a: -1, b: -1, range: [0, arr.length - 1] } });
  for (const f of frames) yield f;
}

function* bucketSort(base) {
  const arr = cappedNonNeg(base);
  const n = arr.length;
  const max = Math.max(...arr, 1);
  const buckets = Array.from({ length: Math.min(10, n || 1) }, () => []);
  const frames = [];
  const bi = (v) =>
    Math.min(buckets.length - 1, Math.floor((v / (max || 1)) * buckets.length));
  for (let i = 0; i < n; i++) {
    const b = bi(arr[i]);
    buckets[b].push(arr[i]);
    frames.push({ arr: arr.slice(), hi: { a: i, b: -1, range: [] } });
  }
  let idx = 0;
  for (const b of buckets) {
    b.sort((a, b) => a - b);
    for (const x of b) {
      arr[idx++] = x;
      frames.push({ arr: arr.slice(), hi: { a: idx - 1, b: -1, range: [] } });
    }
  }
  frames.push({ arr, hi: { a: -1, b: -1, range: [0, n - 1] } });
  for (const f of frames) yield f;
}

function* pigeonholeSort(base) {
  const arr = base.slice();
  if (!arr.length) return;
  const min = Math.min(...arr),
    max = Math.max(...arr);
  const size = max - min + 1;
  const holes = Array.from({ length: size }, () => 0);
  const frames = [];
  for (const x of arr) {
    holes[x - min]++;
    frames.push({ arr: arr.slice(), hi: { a: arr.indexOf(x), b: -1, range: [] } });
  }
  let idx = 0;
  for (let i = 0; i < size; i++)
    while (holes[i]-- > 0) {
      arr[idx++] = i + min;
      frames.push({ arr: arr.slice(), hi: { a: idx - 1, b: -1, range: [] } });
    }
  frames.push({ arr, hi: { a: -1, b: -1, range: [0, arr.length - 1] } });
  for (const f of frames) yield f;
}

function* stoogeSort(base) {
  const arr = base.slice();
  const frames = [];
  const stooge = (l, r) => {
    if (l >= r) return;
    if (arr[l] > arr[r]) {
      [arr[l], arr[r]] = [arr[r], arr[l]];
      frames.push({ arr: arr.slice(), hi: { a: l, b: r, range: [l, r] } });
    }
    if (r - l + 1 > 2) {
      const t = Math.floor((r - l + 1) / 3);
      stooge(l, r - t);
      stooge(l + t, r);
      stooge(l, r - t);
    }
  };
  stooge(0, arr.length - 1);
  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [0, arr.length - 1] } });
  for (const f of frames) yield f;
}

/* Aliasuri pentru hibrizi */
const introSort = (base) => quickSort(base);
const timSort = (base) => mergeSort(base);
const flashSort = (base) => bucketSort(base);

/* Routerul de generatoare */
export const getGenerator = (slug, data, setBanner) => {
  const key = (slug || "").toLowerCase();
  if (setBanner) setBanner("");
  switch (key) {
    case "bubble": return bubbleSort(data);
    case "selection": return selectionSort(data);
    case "insertion": return insertionSort(data);
    case "gnome": return gnomeSort(data);
    case "cocktail": return cocktailSort(data);
    case "oddeven": return oddEvenSort(data);
    case "shell": return shellSort(data);
    case "comb": return combSort(data);
    case "merge": return mergeSort(data);
    case "quick": return quickSort(data);
    case "heap": return heapSort(data);
    case "counting": return countingSort(data);
    case "radix": return radixSortLSD(data);
    case "bucket": return bucketSort(data);
    case "pigeonhole": return pigeonholeSort(data);
    case "stooge": return stoogeSort(data);
    case "intro": return introSort(data);
    case "tim": return timSort(data);
    case "flash": return flashSort(data);
    default:
      return bubbleSort(data);
  }
};

/* ====== Culoare stabilă per valoare (ajută la urmărire) ====== */
export const colorFor = (value, max) => {
  // mapăm valoarea la un unghi HSL; păstrăm luminozitate ridicată pentru contrast
  const hue = (value / Math.max(1, max)) * 280; // 0..280°
  return `hsl(${Math.round(hue)} 85% 55%)`;
};
