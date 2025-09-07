import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import type { UserConfig } from "vite";
import type { InlineConfig as VitestConfig } from "vitest";

interface ConfigWithTest extends UserConfig {
    test?: VitestConfig;
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/tests/setupTests.ts", // optional
    },
} as ConfigWithTest);
