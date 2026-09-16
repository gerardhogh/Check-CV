// IndexedDB helper for Check CV (video interviews and documents)

const DB_NAME = "InterviewDB";
const DB_VERSION = 3;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      return reject(new Error("IndexedDB not supported in this environment"));
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("videos")) {
        db.createObjectStore("videos");
      }
      if (!db.objectStoreNames.contains("documents")) {
        db.createObjectStore("documents");
      }
    };

    request.onsuccess = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// ─── VIDEO STORAGE ─────────────────────────────────────────────────────────────

export async function saveVideoToDB(blob: Blob): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("videos", "readwrite");
    const store = tx.objectStore("videos");
    const req = store.put(blob, "latest_interview");

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getVideoFromDB(): Promise<Blob | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    if (!db.objectStoreNames.contains("videos")) {
      return resolve(null);
    }
    const tx = db.transaction("videos", "readonly");
    const store = tx.objectStore("videos");
    const req = store.get("latest_interview");

    req.onsuccess = () => {
      resolve(req.result || null);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function deleteVideoFromDB(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    if (!db.objectStoreNames.contains("videos")) {
      return resolve();
    }
    const tx = db.transaction("videos", "readwrite");
    const store = tx.objectStore("videos");
    const req = store.delete("latest_interview");

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ─── DOCUMENT / CV STORAGE ─────────────────────────────────────────────────────

export async function saveCvToDB(blob: Blob, name: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("documents", "readwrite");
    const store = tx.objectStore("documents");
    const req = store.put({ blob, name, date: new Date().toISOString() }, "latest_cv");

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getCvFromDB(): Promise<{ blob: Blob; name: string; date: string } | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    if (!db.objectStoreNames.contains("documents")) {
      return resolve(null);
    }
    const tx = db.transaction("documents", "readonly");
    const store = tx.objectStore("documents");
    const req = store.get("latest_cv");

    req.onsuccess = () => {
      resolve(req.result || null);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function deleteCvFromDB(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    if (!db.objectStoreNames.contains("documents")) {
      return resolve();
    }
    const tx = db.transaction("documents", "readwrite");
    const store = tx.objectStore("documents");
    const req = store.delete("latest_cv");

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
