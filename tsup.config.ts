import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/lib/sidebar/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: false,
  external: ["react", "react-dom", "motion"],
  loader: {
    ".css": "copy",
  },
});