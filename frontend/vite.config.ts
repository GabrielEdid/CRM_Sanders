import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:5001", // Cambia al puerto donde corre tu backend
        changeOrigin: true,
        secure: false,
        // Opcional: reescribe la ruta si es necesario
        // rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  base: "./",
});
