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
  bitonic: "Bitonic Sort",
  oddevenmerge: "Odd–Even Merge Sort",
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

/* ============== Generatoare (emit: { arr, hi?, stepKey? }) ============== */
function* bubbleSort(base) {
  const arr = base.slice();
  const n = arr.length;
  let swapped = true;

  yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" };

  for (let i = 0; i < n - 1 && swapped; i++) {
    swapped = false;
    yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [n - i, n - 1] }, stepKey: "outer" };

    for (let j = 0; j < n - i - 1; j++) {
      yield {
        arr: arr.slice(),
        hi: { a: j, b: j + 1, range: [n - i, n - 1] },
        stepKey: "compare",
      };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        yield { arr: arr.slice(), hi: { a: j, b: j + 1, range: [n - i, n - 1] }, stepKey: "swap" };
      }
    }

    yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [n - i - 1, n - 1] }, stepKey: "pass_done" };
  }

  yield { arr, hi: { a: -1, b: -1, range: [0, n - 1] }, stepKey: "done" };
}

function* selectionSort(base) {
  const arr = base.slice();
  const n = arr.length;

  yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" };

  for (let i = 0; i < n - 1; i++) {
    let min = i;
    yield { arr: arr.slice(), hi: { a: i, b: min, range: [0, i - 1] }, stepKey: "outer" };

    for (let j = i + 1; j < n; j++) {
      yield { arr: arr.slice(), hi: { a: min, b: j, range: [0, i - 1] }, stepKey: "compare" };
      if (arr[j] < arr[min]) {
        min = j;
        yield { arr: arr.slice(), hi: { a: min, b: j, range: [0, i - 1] }, stepKey: "select_min" };
      }
    }

    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
      yield { arr: arr.slice(), hi: { a: i, b: min, range: [0, i] }, stepKey: "swap" };
    } else {
      yield { arr: arr.slice(), hi: { a: i, b: min, range: [0, i] }, stepKey: "pass_done" };
    }
  }

  yield { arr, hi: { a: -1, b: -1, range: [0, n - 1] }, stepKey: "done" };
}

function* insertionSort(base) {
  const arr = base.slice();
  const n = arr.length;

  yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" };

  for (let i = 1; i < n; i++) {
    let key = arr[i],
      j = i - 1;

    yield { arr: arr.slice(), hi: { a: i, b: j, range: [0, i - 1] }, stepKey: "pick_key" };

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      yield { arr: arr.slice(), hi: { a: j, b: j + 1, range: [0, i] }, stepKey: "shift" };
      j--;
    }

    arr[j + 1] = key;
    yield { arr: arr.slice(), hi: { a: j + 1, b: -1, range: [0, i] }, stepKey: "insert" };
  }

  yield { arr, hi: { a: -1, b: -1, range: [0, n - 1] }, stepKey: "done" };
}

function* gnomeSort(base) {
  const arr = base.slice();
  let i = 1;

  yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" };

  while (i < arr.length) {
    yield { arr: arr.slice(), hi: { a: i - 1, b: i, range: [] }, stepKey: "compare" };
    if (i === 0 || arr[i] >= arr[i - 1]) {
      i++;
      yield { arr: arr.slice(), hi: { a: i - 1, b: i, range: [] }, stepKey: "advance" };
    } else {
      [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
      yield { arr: arr.slice(), hi: { a: i - 1, b: i, range: [] }, stepKey: "swap" };
      i--;
    }
  }

  yield { arr, hi: { a: -1, b: -1, range: [0, arr.length - 1] }, stepKey: "done" };
}

function* cocktailSort(base) {
  const arr = base.slice();
  let start = 0,
    end = arr.length - 1,
    swapped = true;

  yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" };

  while (swapped) {
    swapped = false;

    // forward pass
    yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [start, end] }, stepKey: "forward_pass" };
    for (let i = start; i < end; i++) {
      yield { arr: arr.slice(), hi: { a: i, b: i + 1, range: [end + 1, arr.length - 1] }, stepKey: "compare" };
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        yield { arr: arr.slice(), hi: { a: i, b: i + 1, range: [end + 1, arr.length - 1] }, stepKey: "swap" };
      }
    }
    end--;

    if (!swapped) break;

    swapped = false;

    // backward pass
    yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [start, end] }, stepKey: "backward_pass" };
    for (let i = end; i > start; i--) {
      yield { arr: arr.slice(), hi: { a: i - 1, b: i, range: [0, start - 1] }, stepKey: "compare" };
      if (arr[i] < arr[i - 1]) {
        [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
        swapped = true;
        yield { arr: arr.slice(), hi: { a: i - 1, b: i, range: [0, start - 1] }, stepKey: "swap" };
      }
    }
    start++;

    yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [start, end] }, stepKey: "pass_done" };
  }

  yield { arr, hi: { a: -1, b: -1, range: [0, arr.length - 1] }, stepKey: "done" };
}

function* oddEvenSort(base) {
  const arr = base.slice();
  let sorted = false,
    n = arr.length;

  yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" };

  while (!sorted) {
    sorted = true;

    // odd phase
    yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "odd_phase" };
    for (let i = 1; i <= n - 2; i += 2) {
      yield { arr: arr.slice(), hi: { a: i, b: i + 1, range: [] }, stepKey: "compare" };
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
        yield { arr: arr.slice(), hi: { a: i, b: i + 1, range: [] }, stepKey: "swap" };
      }
    }

    // even phase
    yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "even_phase" };
    for (let i = 0; i <= n - 2; i += 2) {
      yield { arr: arr.slice(), hi: { a: i, b: i + 1, range: [] }, stepKey: "compare" };
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
        yield { arr: arr.slice(), hi: { a: i, b: i + 1, range: [] }, stepKey: "swap" };
      }
    }
  }

  yield { arr, hi: { a: -1, b: -1, range: [0, n - 1] }, stepKey: "done" };
}

function* shellSort(base) {
  const arr = base.slice();
  const n = arr.length;
  let gap = 1;

  yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" };

  while (gap < n / 3) gap = 3 * gap + 1; // Knuth
  yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "gap_init" };

  while (gap >= 1) {
    yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "gap_loop" };

    for (let i = gap; i < n; i++) {
      let temp = arr[i],
        j = i;

      yield { arr: arr.slice(), hi: { a: i, b: i - gap, range: [] }, stepKey: "pick_temp" };

      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
        yield { arr: arr.slice(), hi: { a: j, b: j + gap, range: [] }, stepKey: "shift" };
      }

      arr[j] = temp;
      yield { arr: arr.slice(), hi: { a: j, b: i, range: [] }, stepKey: "insert" };
    }

    gap = Math.floor(gap / 3);
    yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "gap_update" };
  }

  yield { arr, hi: { a: -1, b: -1, range: [0, n - 1] }, stepKey: "done" };
}

function* combSort(base) {
  const arr = base.slice();
  const n = arr.length;
  let gap = n,
    swapped = true;
  const shrink = 1.3;

  yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" };

  while (gap > 1 || swapped) {
    gap = Math.max(1, Math.floor(gap / shrink));
    swapped = false;

    yield { arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "gap_update" };

    for (let i = 0; i + gap < n; i++) {
      yield { arr: arr.slice(), hi: { a: i, b: i + gap, range: [] }, stepKey: "compare" };
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        swapped = true;
        yield { arr: arr.slice(), hi: { a: i, b: i + gap, range: [] }, stepKey: "swap" };
      }
    }
  }

  yield { arr, hi: { a: -1, b: -1, range: [0, n - 1] }, stepKey: "done" };
}

function* mergeSort(base) {
  const arr = base.slice();
  const frames = [];

  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" });

  const merge = (l, m, r) => {
    const L = arr.slice(l, m + 1),
      R = arr.slice(m + 1, r + 1);
    let i = 0,
      j = 0,
      k = l;

    frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [l, r] }, stepKey: "merge_begin" });

    while (i < L.length && j < R.length) {
      frames.push({ arr: arr.slice(), hi: { a: l + i, b: m + 1 + j, range: [l, r] }, stepKey: "compare" });
      arr[k++] = L[i] <= R[j] ? L[i++] : R[j++];
      frames.push({ arr: arr.slice(), hi: { a: k - 1, b: -1, range: [l, r] }, stepKey: "write" });
    }
    while (i < L.length) {
      arr[k++] = L[i++];
      frames.push({ arr: arr.slice(), hi: { a: k - 1, b: -1, range: [l, r] }, stepKey: "write" });
    }
    while (j < R.length) {
      arr[k++] = R[j++];
      frames.push({ arr: arr.slice(), hi: { a: k - 1, b: -1, range: [l, r] }, stepKey: "write" });
    }

    frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [l, r] }, stepKey: "merge_end" });
  };

  const sort = (l, r) => {
    if (l >= r) return;
    const m = (l + r) >> 1;
    frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [l, r] }, stepKey: "split" });
    sort(l, m);
    sort(m + 1, r);
    merge(l, m, r);
  };

  sort(0, arr.length - 1);

  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [0, arr.length - 1] }, stepKey: "done" });
  for (const f of frames) yield f;
}

function* quickSort(base) {
  const arr = base.slice();
  const frames = [];

  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" });

  const qs = (l, r) => {
    if (l >= r) return;

    const pivot = arr[r];
    frames.push({ arr: arr.slice(), hi: { a: r, b: -1, range: [l, r] }, stepKey: "pivot" });

    let i = l;
    for (let j = l; j < r; j++) {
      frames.push({ arr: arr.slice(), hi: { a: j, b: r, range: [l, r] }, stepKey: "compare_pivot" });
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        frames.push({ arr: arr.slice(), hi: { a: i, b: j, range: [l, r] }, stepKey: "swap" });
        i++;
      }
    }
    [arr[i], arr[r]] = [arr[r], arr[i]];
    frames.push({ arr: arr.slice(), hi: { a: i, b: r, range: [l, r] }, stepKey: "partition" });

    qs(l, i - 1);
    qs(i + 1, r);
  };

  qs(0, arr.length - 1);

  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [0, arr.length - 1] }, stepKey: "done" });
  for (const f of frames) yield f;
}

function* heapSort(base) {
  const arr = base.slice();
  const n = arr.length;
  const frames = [];

  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" });

  const heapify = (n, i, endMark) => {
    let largest = i,
      l = 2 * i + 1,
      r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    frames.push({ arr: arr.slice(), hi: { a: i, b: largest, range: [endMark, n - 1] }, stepKey: "heapify_compare" });

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      frames.push({ arr: arr.slice(), hi: { a: i, b: largest, range: [endMark, n - 1] }, stepKey: "heapify_swap" });
      heapify(n, largest, endMark);
    }
  };

  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [0, n - 1] }, stepKey: "build_heap" });
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i, n);

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    frames.push({ arr: arr.slice(), hi: { a: 0, b: i, range: [i, n - 1] }, stepKey: "extract_swap" });
    heapify(i, 0, i);
  }

  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [0, n - 1] }, stepKey: "done" });
  for (const f of frames) yield f;
}

function* countingSort(base) {
  const arr = cappedNonNeg(base);
  const k = Math.max(...arr, 0);
  const count = Array(k + 1).fill(0);
  const frames = [];

  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" });

  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
    frames.push({ arr: arr.slice(), hi: { a: i, b: -1, range: [] }, stepKey: "count" });
  }

  let idx = 0;
  for (let v = 0; v <= k; v++) {
    while (count[v]-- > 0) {
      arr[idx++] = v;
      frames.push({ arr: arr.slice(), hi: { a: idx - 1, b: -1, range: [] }, stepKey: "write" });
    }
  }

  frames.push({ arr, hi: { a: -1, b: -1, range: [0, arr.length - 1] }, stepKey: "done" });
  for (const f of frames) yield f;
}

function* radixSortLSD(base) {
  const arr = cappedNonNeg(base);
  const frames = [];
  let max = Math.max(...arr, 0);

  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" });

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "digit_pass" });

    const out = Array(arr.length).fill(0),
      count = Array(10).fill(0);

    for (const x of arr) count[Math.floor(x / exp) % 10]++;

    for (let i = 1; i < 10; i++) count[i] += count[i - 1];

    for (let i = arr.length - 1; i >= 0; i--) {
      const d = Math.floor(arr[i] / exp) % 10;
      out[--count[d]] = arr[i];
      frames.push({ arr: arr.slice(), hi: { a: i, b: -1, range: [] }, stepKey: "counting_place" });
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = out[i];
      frames.push({ arr: arr.slice(), hi: { a: i, b: -1, range: [] }, stepKey: "write" });
    }
  }

  frames.push({ arr, hi: { a: -1, b: -1, range: [0, arr.length - 1] }, stepKey: "done" });
  for (const f of frames) yield f;
}

function* bucketSort(base) {
  const arr = cappedNonNeg(base);
  const n = arr.length;
  const max = Math.max(...arr, 1);
  const buckets = Array.from({ length: Math.min(10, n || 1) }, () => []);
  const frames = [];

  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" });

  const bi = (v) =>
    Math.min(buckets.length - 1, Math.floor((v / (max || 1)) * buckets.length));

  for (let i = 0; i < n; i++) {
    const b = bi(arr[i]);
    buckets[b].push(arr[i]);
    frames.push({ arr: arr.slice(), hi: { a: i, b: -1, range: [] }, stepKey: "bucket_place" });
  }

  let idx = 0;
  for (const b of buckets) {
    b.sort((a, b) => a - b);
    frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "bucket_sort" });

    for (const x of b) {
      arr[idx++] = x;
      frames.push({ arr: arr.slice(), hi: { a: idx - 1, b: -1, range: [] }, stepKey: "write" });
    }
  }

  frames.push({ arr, hi: { a: -1, b: -1, range: [0, n - 1] }, stepKey: "done" });
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

  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" });

  for (let i = 0; i < arr.length; i++) {
    const x = arr[i];
    holes[x - min]++;
    frames.push({ arr: arr.slice(), hi: { a: i, b: -1, range: [] }, stepKey: "count" });
  }

  let idx = 0;
  for (let i = 0; i < size; i++) {
    while (holes[i]-- > 0) {
      arr[idx++] = i + min;
      frames.push({ arr: arr.slice(), hi: { a: idx - 1, b: -1, range: [] }, stepKey: "write" });
    }
  }

  frames.push({ arr, hi: { a: -1, b: -1, range: [0, arr.length - 1] }, stepKey: "done" });
  for (const f of frames) yield f;
}

function* stoogeSort(base) {
  const arr = base.slice();
  const frames = [];

  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [] }, stepKey: "init" });

  const stooge = (l, r) => {
    if (l >= r) return;
    if (arr[l] > arr[r]) {
      [arr[l], arr[r]] = [arr[r], arr[l]];
      frames.push({ arr: arr.slice(), hi: { a: l, b: r, range: [l, r] }, stepKey: "swap" });
    }
    if (r - l + 1 > 2) {
      const t = Math.floor((r - l + 1) / 3);
      frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [l, r] }, stepKey: "recurse" });
      stooge(l, r - t);
      stooge(l + t, r);
      stooge(l, r - t);
    }
  };

  stooge(0, arr.length - 1);

  frames.push({ arr: arr.slice(), hi: { a: -1, b: -1, range: [0, arr.length - 1] }, stepKey: "done" });
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
    case "bubble":
      return bubbleSort(data);
    case "selection":
      return selectionSort(data);
    case "insertion":
      return insertionSort(data);
    case "gnome":
      return gnomeSort(data);
    case "cocktail":
      return cocktailSort(data);
    case "oddeven":
      return oddEvenSort(data);
    case "shell":
      return shellSort(data);
    case "comb":
      return combSort(data);
    case "merge":
      return mergeSort(data);
    case "quick":
      return quickSort(data);
    case "heap":
      return heapSort(data);
    case "counting":
      return countingSort(data);
    case "radix":
      return radixSortLSD(data);
    case "bucket":
      return bucketSort(data);
    case "pigeonhole":
      return pigeonholeSort(data);
    case "stooge":
      return stoogeSort(data);
    case "intro":
      return introSort(data);
    case "tim":
      return timSort(data);
    case "flash":
      return flashSort(data);
    default:
      return bubbleSort(data);
  }
};

/* ====== Culoare stabilă per valoare (ajută la urmărire) ====== */
export const colorFor = (value, max) => {
  const hue = (value / Math.max(1, max)) * 280; // 0..280°
  return `hsl(${Math.round(hue)} 85% 55%)`;
};
