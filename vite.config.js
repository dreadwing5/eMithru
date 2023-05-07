// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//   },
// });

import { defineConfig } from "vite";
// import reactRefresh from "@vitejs/plugin-react-refresh";
import react from "@vitejs/plugin-react";
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      minify: mode === "production",
    },
    server: {
      port: 3000,
    },
  };
});
