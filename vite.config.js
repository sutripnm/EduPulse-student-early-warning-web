import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_API_PROXY_TARGET;

  if (!apiTarget) {
    throw new Error(
      "VITE_API_PROXY_TARGET belum diatur. Buat file .env.local di root project."
    );
  }

  return {
    plugins: [react()],

    server: {
      host: true,

      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});