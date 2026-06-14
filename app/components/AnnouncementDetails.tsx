import AnnouncementCard from "./AnnouncementCard";
import type { Announcement } from "~/shared/types";
import { useNavigate } from "react-router";

export default function AnnouncementDetails({
  details,
}: {
  details: Announcement;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex-column gap-1">
      <button onClick={() => navigate(-1)} className="custom-btn">
        ←
      </button>

      <AnnouncementCard isExpanded={true} details={details} />
    </div>
  );
}
