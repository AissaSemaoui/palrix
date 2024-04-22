import {
  XIcon,
  Loader2Icon,
  MenuIcon,
  PaletteIcon,
  HomeIcon,
  SettingsIcon,
  SwatchBookIcon,
  LogOutIcon,
} from "lucide-react";

export const Icons = {
  logo: PaletteIcon,
  close: XIcon,
  loader: Loader2Icon,
  menu: MenuIcon,
  home: HomeIcon,
  playground: SwatchBookIcon,
  settings: SettingsIcon,
  logout: LogOutIcon,
} as const;
