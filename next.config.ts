import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/admin",
        destination: "/admin/home",
        permanent: true,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
