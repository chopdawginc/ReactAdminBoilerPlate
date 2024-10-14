import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@services": path.resolve(__dirname, "src/services"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@libs": path.resolve(__dirname, "src/libs"),
      "@hocs": path.resolve(__dirname, "src/hocs"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@models": path.resolve(__dirname, "src/models"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@screens": path.resolve(__dirname, "src/screens"),
      "@validations": path.resolve(__dirname, "src/validations"),
    },
  },
});
