import type { Route } from "./+types/home";
import AnnouncementCard from "~/components/AnnouncementCard";
import type { Announcement } from "~/shared/types";
import { useBookmarks } from "~/context/bookmarks";
import { Link } from "react-router";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Announcement Bookmarks" },
    {
      name: "description",
      content: "Welcome to Government Announcement Bookmarks!",
    },
  ];
}

export default function Bookmarks() {
  const { bookmarks } = useBookmarks();

  if (bookmarks.length === 0) {
    return (
      <div className="flex-center flex-column gap-1">
        <h3>No bookmarks yet. Go to the announcements feed to add some!</h3>
        <Link to="/announcements" className="custom-btn">
          Go to Announcements
        </Link>
      </div>
    );
  }

  return (
    <ul className="list">
      {bookmarks.map((bookmarkedItem: Announcement) => (
        <li key={bookmarkedItem.id} className="announcement-list-item">
          <AnnouncementCard isExpanded={false} details={bookmarkedItem} />
        </li>
      ))}
    </ul>
  );
}
