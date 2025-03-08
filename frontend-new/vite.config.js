import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [viteCompression()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@mui")) return "mui"; // Separate MUI
            if (id.includes("react")) return "react"; // Separate React
            if (id.includes("react-router-dom")) return "router"; // Separate Router
            return "vendor"; // Other dependencies
          }
        },
      },
    },
  },
});
