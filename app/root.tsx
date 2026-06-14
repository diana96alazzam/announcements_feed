import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { BookmarksProvider, useBookmarks } from "./context/bookmarks";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>
        <Meta />
        <Links />
      </head>
      <BookmarksProvider>
        <body className="flex-column">
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </BookmarksProvider>
    </html>
  );
}

export default function App() {
  const { bookmarksCount } = useBookmarks();
  return (
    <>
      <header className="flex-center">
        <h1>Government Announcements Feed</h1>
      </header>
      <nav className="flex-center">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/announcements">Announcements</NavLink>

        <NavLink to="/bookmarks">
          Bookmarks ({`${bookmarksCount || 0}`})
        </NavLink>
      </nav>
      <main className="flex-center">
        <Outlet />
      </main>
      <footer className="flex-center">
        © 2026 Diana Al-azzam. All rights reserved
      </footer>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
