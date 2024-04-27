export const routes = {
  auth: {
    root: "/auth",
    google: "/google",
    logout: "/logout",
    me: "/me",
  },
  palette: "/palette",
} as const;

export const createRoutePath = (path: string) => `/api${path}` as const;
