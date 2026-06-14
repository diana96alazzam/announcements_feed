import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Government Main Page" },
    {
      name: "description",
      content: "Welcome to the Government Main Page!",
    },
  ];
}

export default function Home() {
  return (
    <div className="flex-center flex-column gap-1">
      <h2>Welcome to the Government Main Page!</h2>
      <Link to="/announcements" className="custom-btn">
        Go to Announcements
      </Link>
    </div>
  );
}
