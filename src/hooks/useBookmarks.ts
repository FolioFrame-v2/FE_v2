import { useState, useEffect } from 'react';

const store = new EventTarget();

const getStoredBookmarks = () => {
  try {
    const item = localStorage.getItem('portfolio_bookmarks');
    return item ? JSON.parse(item) : {};
  } catch {
    return {};
  }
};

const setStoredBookmarks = (data: Record<number, boolean>) => {
  localStorage.setItem('portfolio_bookmarks', JSON.stringify(data));
  store.dispatchEvent(new Event('change'));
};

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Record<number, boolean>>(getStoredBookmarks());

  useEffect(() => {
    const handler = () => setBookmarks(getStoredBookmarks());
    store.addEventListener('change', handler);
    window.addEventListener('storage', handler);
    return () => {
      store.removeEventListener('change', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const setBookmarkState = (id: number, state: boolean) => {
    const current = getStoredBookmarks();
    current[id] = state;
    setStoredBookmarks(current);
  };

  return { bookmarks, setBookmarkState };
}
