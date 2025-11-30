import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  worker: {
    format: "es",
  },
  optimizeDeps: {
    exclude: ["@xenova/transformers", "onnxruntime-web"],
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          transformers: ["@xenova/transformers"],
          onnxruntime: ["onnxruntime-web"],
          mui: ["@mui/material", "@mui/icons-material"],
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
