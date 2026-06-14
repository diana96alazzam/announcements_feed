import { useMemo } from "react";
import type { Route } from "./+types/home";
import useFetchDataHook from "../hooks/useFetchDataHook";
import AnnouncementCard from "../components/AnnouncementCard";
import ErrorCard from "~/components/ErrorCard";
import type { Announcement, Categories } from "~/shared/types";
import { CATEGORIES } from "~/shared/types";
import { useSearchParams } from "react-router";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Announcements Feed" },
    {
      name: "description",
      content: "Welcome to Government Announcements Feed!",
    },
  ];
}

export default function Announcements() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const categories = searchParams.getAll("category") as Categories[];

  const { data, reloadData } = useFetchDataHook<Array<Announcement>>(
    "https://jsonplaceholder.typicode.com/posts",
  );

  const filteredAnnouncement = useMemo(() => {
    const currentData = data.data || [];
    const searchKey = search.toLowerCase().trim();

    const dataWithCategory = currentData.map((item) => ({
      ...item,
      category: CATEGORIES[item.id % 4],
    }));

    if (!searchKey && categories.length === 0) return dataWithCategory;

    return dataWithCategory.filter((item) => {
      let isMatchSearch = true;
      let isMatchCategory = true;
      if (searchKey)
        isMatchSearch = item.title.toLowerCase().includes(searchKey);
      if (categories.length > 0)
        isMatchCategory = categories.includes(item.category);

      return isMatchSearch && isMatchCategory;
    });
  }, [data.data, search, categories]);

  if (data.isLoading) {
    return <p>Loading...</p>;
  }

  if (data.isError || !data.data) {
    return <ErrorCard reloadData={reloadData} />;
  }

  return (
    <div>
      <input
        value={search}
        type="search"
        placeholder="Search announcement from here ..."
        onChange={(event) => {
          const value = event.target.value;

          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            if (value) params.set("search", value);
            else params.delete("search");
            return params;
          });
        }}
      />
      <div className="categories-filter">
        {CATEGORIES.map((category) => (
          <button
            className={
              "custom-btn" + (categories.includes(category) ? " active" : "")
            }
            onClick={() => {
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);

                const existing = params.getAll("category");

                const updated = existing.includes(category)
                  ? existing.filter((c) => c !== category)
                  : [...existing, category];

                params.delete("category");
                updated.forEach((c) => params.append("category", c));

                return params;
              });
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <ul className="list">
        {filteredAnnouncement.map((announcementItem) => (
          <li key={announcementItem.id} className="announcement-list-item">
            <AnnouncementCard isExpanded={false} details={announcementItem} />
          </li>
        ))}
      </ul>
    </div>
  );
}
