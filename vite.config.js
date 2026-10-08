import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/unix-timestamp-converter/",
    build: { sourcemap: false },
    plugins: [react()],
});
