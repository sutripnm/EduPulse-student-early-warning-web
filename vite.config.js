import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const DEFAULT_API_TARGET = "";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_API_PROXY_TARGET || DEFAULT_API_TARGET;

  if (!apiTarget) {
    console.warn(
      "VITE_API_PROXY_TARGET belum diatur. Buat .env.local dan isi dengan URL backend ngrok yang sedang aktif."
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
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      },
    },
  };
});
