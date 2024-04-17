export const paths = {
  marketing: "/",
  dashboard: {
    root: "/dashboard",
    home: "/dashboard/home",
    playground: "/dashboard/playground",
    settings: "/dashboard/settings",
    profile: "/dashboard/profile",
  },
  auth: {
    root: "/auth",
    login: "/auth/login",
    register: "/auth/register",
  },
} as const;

console.log(paths);
