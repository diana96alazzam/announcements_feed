import { createContext, useContext } from "react";
import useBookmarksHook from "~/hooks/useBookmarksHook";

const BookmarksContext = createContext<ReturnType<
  typeof useBookmarksHook
> | null>(null);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const bookmarks = useBookmarksHook();

  return (
    <BookmarksContext.Provider value={bookmarks}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error("useBookmarks must be used inside provider");
  return ctx;
}
