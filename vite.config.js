import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import legacy from "vite-plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy()],
  base: "/mikha-prod/",
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  extensions: ['.jsx', '.js']
});
