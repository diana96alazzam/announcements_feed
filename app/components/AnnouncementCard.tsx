import { Link } from "react-router";
import type { Announcement } from "~/shared/types";
import { useBookmarks } from "~/context/bookmarks";

export default function AnnouncementCard({
  details,
  isExpanded,
}: {
  details: Announcement;
  isExpanded: boolean;
}) {
  const { isBookmarked, toggleBookmark } = useBookmarks();

  return (
    <div
      className={
        "announcement-card flex-column" + (isExpanded ? " expanded" : "")
      }
    >
      <div className="announcement-header">
        <div className="announcement-title-container">
          <Link
            className="announcement-title"
            to={`/announcements/${details.id}`}
            state={{ details }}
            onClick={(e) => {
              if (isExpanded) e.preventDefault();
            }}
          >
            {details.title}
          </Link>
          <span className="badge badge-category">{details.category}</span>
          {details.id % 7 === 0 && (
            <span className="badge badge-danger">Urgent</span>
          )}
        </div>
        <button
          className="custom-btn"
          onClick={() => {
            toggleBookmark(details);
          }}
        >
          {isBookmarked(details.id) ? "★" : "☆"}
        </button>
      </div>
      {isExpanded && <p className="announcement-body">{details.body}</p>}
    </div>
  );
}
