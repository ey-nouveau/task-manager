import { Home, LayoutGrid, LinkIcon, Settings, HamIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

type NavItem = {
  path: string;
  label: string;
  icon: JSX.Element;
  active?: boolean;
};

const navItems: NavItem[] = [
  { path: "/", label: "Home", icon: <Home size={18} /> },
  { path: "/dashboard", label: "Dashboard", icon: <LayoutGrid size={18} /> },
  { path: "/board", label: "Task Board", icon: <HamIcon size={18} /> },
  {
    path: "/integrations",
    label: "Integrations",
    icon: <LinkIcon size={18} />,
  },
  { path: "/preferences", label: "Preferences", icon: <Settings size={18} /> },
];

export const useHeaderLinks = () => {
  const location = useLocation();

  const mappedNavItems = navItems.map((item) => ({
    ...item,
    active: item.path === location.pathname,
  }));

  return mappedNavItems;
};
