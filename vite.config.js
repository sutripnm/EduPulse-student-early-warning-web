import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const DEFAULT_API_TARGET =
  "https://92d0-2402-8780-1018-c90c-9800-a1d9-4813-cf12.ngrok-free.app";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_API_PROXY_TARGET || DEFAULT_API_TARGET;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          secure: true,
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      },
    },
  };
});
