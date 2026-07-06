import { useState, useEffect } from 'react';

const store = new EventTarget();

const getStoredBookmarks = () => {
  try {
    const item = localStorage.getItem('job_bookmarks');
    return item ? JSON.parse(item) : {};
  } catch {
    return {};
  }
};

const setStoredBookmarks = (data: Record<string, boolean>) => {
  localStorage.setItem('job_bookmarks', JSON.stringify(data));
  store.dispatchEvent(new Event('change'));
};

export function useJobBookmarks() {
  const [jobBookmarks, setBookmarks] = useState<Record<string, boolean>>(getStoredBookmarks());

  useEffect(() => {
    const handler = () => setBookmarks(getStoredBookmarks());
    store.addEventListener('change', handler);
    window.addEventListener('storage', handler);
    return () => {
      store.removeEventListener('change', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const setJobBookmarkState = (id: string | number, state: boolean) => {
    const current = getStoredBookmarks();
    current[String(id)] = state;
    setStoredBookmarks(current);
  };

  return { jobBookmarks, setJobBookmarkState };
}
