import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    host: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "../certs/server.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "../certs/server.crt")),
    },
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL, // Cambia al puerto donde corre tu backend
        changeOrigin: true,
        secure: true,
        // Opcional: reescribe la ruta si es necesario
        // rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  base: "./",
});
