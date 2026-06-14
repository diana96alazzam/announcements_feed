export type Categories =
  | "Health"
  | "Transport"
  | "Education"
  | "Infrastructure";

export interface Announcement {
  id: number;
  userId: number;
  title: string;
  body: string;
  category: Categories;
}

export const CATEGORIES: Categories[] = [
  "Health",
  "Transport",
  "Education",
  "Infrastructure",
];
