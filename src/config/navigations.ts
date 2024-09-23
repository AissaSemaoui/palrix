export const paths = {
  marketing: "/",
  dashboard: {
    root: "/dashboard",
    home: "/dashboard/playground",
    playground: (paletteId: string) => `/dashboard/playground/${paletteId}`,
    settings: "/dashboard/settings",
    profile: "/dashboard/profile",
  },
  auth: {
    root: "/auth",
    login: "/auth/sign-in",
    register: "/auth/sign-up",
  },
} as const;
