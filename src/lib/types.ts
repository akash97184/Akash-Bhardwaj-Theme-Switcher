import type { IconType } from "react-icons/lib";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type NavLink = {
  path: string;
  label: string;
  Icon?: IconType;
};

export type Theme = "light" | "dark" | "colorful";