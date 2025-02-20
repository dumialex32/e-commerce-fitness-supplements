import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/api": "http://localhost:5000", // proxy for local host
      "/api": "http://backend:5000", // proxy for docker
    },
    host: "0.0.0.0",
    watch: {
      usePolling: true, // fpr docker on windows
    },
  },
});
