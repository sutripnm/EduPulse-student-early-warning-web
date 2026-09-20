import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Proxy hanya dibutuhkan saat development.
  const apiTarget = env.VITE_API_PROXY_TARGET;

  return {
    plugins: [react()],

    // Vite proxy hanya aktif saat menjalankan npm run dev.
    ...(mode === "development" && apiTarget
      ? {
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
        }
      : {}),
  };
});