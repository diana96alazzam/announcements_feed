import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("announcements", "routes/announcements.tsx"),
  route("announcements/:id", "routes/announcement.tsx"),
  route("bookmarks", "routes/bookmarks.tsx"),
] satisfies RouteConfig;
