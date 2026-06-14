import type { Route } from "./+types/home";
import { useLocation, useParams } from "react-router";
import type { Announcement } from "~/shared/types";
import FetchAnnouncement from "~/components/FetchAnnouncement";
import AnnouncementDetails from "~/components/AnnouncementDetails";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Announcement Details" },
    {
      name: "description",
      content: "Welcome to Government Announcement Details!",
    },
  ];
}

export default function Announcement() {
  const id = useParams().id ?? "1";
  const { state } = useLocation();

  const announcement = state?.details;

  if (!announcement) {
    return <FetchAnnouncement id={parseInt(id)} />;
  }

  return <AnnouncementDetails details={announcement} />;
}
