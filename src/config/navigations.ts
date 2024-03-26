export const paths = {
  marketing: "/",
  dashboard: "/dashboard",
  auth: {
    base: "/auth",
    login: "/auth/login",
    register: "/auth/register",
  },
} as const;

console.log(paths);
