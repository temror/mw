import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".vue", ".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  server: {
    proxy: {
      "/api": "http://localhost:1337/",
    },
  },
  preview: {
    port: 80,
  },
});
