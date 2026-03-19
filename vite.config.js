import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  build: {
    outDir: "dist",
    assetsDir: 'assets',
    rollupOptions: {
      input: "index.html", // Don't put ./ or ../ — just 'index.html'
    },
    
  },
});
