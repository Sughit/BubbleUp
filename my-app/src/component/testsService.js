import { db } from "../firebase";
import {
  push,
  ref,
  get,
  child,
  serverTimestamp,
  update,
  remove,
} from "firebase/database";

const TESTS_PATH = "sortingTests";

function normalizeTests(snapshot) {
  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.entries(data)
    .map(([id, value]) => ({
      id,
      ...value,
    }))
    .sort((a, b) => {
      const ta = a.createdAt || 0;
      const tb = b.createdAt || 0;
      return tb - ta;
    });
}

export async function getPublishedTests() {
  const snapshot = await get(child(ref(db), TESTS_PATH));

  return normalizeTests(snapshot).filter((test) => test.isPublished === true);
}

export async function getAllSortingTests() {
  const snapshot = await get(child(ref(db), TESTS_PATH));

  return normalizeTests(snapshot);
}

export async function addSortingTest(data) {
  const testsRef = ref(db, TESTS_PATH);

  return push(testsRef, {
    ...data,
    isPublished: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateSortingTest(id, data) {
  const testRef = ref(db, `${TESTS_PATH}/${id}`);

  return update(testRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function setTestPublished(id, isPublished) {
  const testRef = ref(db, `${TESTS_PATH}/${id}`);

  return update(testRef, {
    isPublished,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteSortingTest(id) {
  const testRef = ref(db, `${TESTS_PATH}/${id}`);

  return remove(testRef);
}