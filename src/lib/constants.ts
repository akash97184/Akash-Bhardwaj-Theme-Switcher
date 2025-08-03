import { ROUTES } from "@/routes/routes";
import type { NavLink } from "./types";
import { IoHome, IoInformationCircleOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export const navLinks: NavLink[] = [
  { path: ROUTES.HOME, label: "Home", Icon: IoHome },
  { path: ROUTES.ABOUT, label: "About", Icon: IoInformationCircleOutline },
  { path: ROUTES.CONTACT, label: "Contact", Icon: MdEmail },
];
