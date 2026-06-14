import useFetchDataHook from "~/hooks/useFetchDataHook";
import ErrorCard from "~/components/ErrorCard";
import { CATEGORIES, type Announcement } from "~/shared/types";
import AnnouncementDetails from "./AnnouncementDetails";

export default function FetchAnnouncement({ id }: { id: number }) {
  const { data, reloadData } = useFetchDataHook<Announcement>(
    "https://jsonplaceholder.typicode.com/posts/" + id,
  );

  if (data.isLoading) {
    return <p>Loading...</p>;
  }

  if (data.isError || !data.data) {
    return <ErrorCard reloadData={reloadData} />;
  }

  return (
    <AnnouncementDetails
      details={{ ...data.data, category: CATEGORIES[data.data.id % 4] }}
    />
  );
}
