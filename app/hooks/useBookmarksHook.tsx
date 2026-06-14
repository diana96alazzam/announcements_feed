import { useEffect, useState, useCallback } from "react";
import type { Announcement } from "~/shared/types";

const STORAGE_KEY = "bookmarked-announcements";

function readFromStorage(): Announcement[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeToStorage(items: Announcement[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function useBookmarksHook() {
  const [bookmarks, setBookmarks] = useState<Announcement[]>(() =>
    readFromStorage(),
  );

  const bookmarksCount = bookmarks.length;

  const toggleBookmark = useCallback((item: Announcement) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);

      return exists ? prev.filter((b) => b.id !== item.id) : [...prev, item];
    });
  }, []);

  const isBookmarked = useCallback(
    (id: number) => {
      return bookmarks.some((b) => b.id === id);
    },
    [bookmarks],
  );

  useEffect(() => {
    writeToStorage(bookmarks);
  }, [bookmarks]);

  return {
    bookmarks,
    bookmarksCount,
    setBookmarks,
    toggleBookmark,
    isBookmarked,
  };
}
