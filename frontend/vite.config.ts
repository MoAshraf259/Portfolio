import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const basePath = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  plugins: [react()],
  base: basePath,
  resolve: {
    alias: {
      react: path.resolve(__dirname, "../node_modules/react"),
      "react-dom": path.resolve(__dirname, "../node_modules/react-dom"),
    },
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
