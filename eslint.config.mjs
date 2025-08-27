import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // Turn off TypeScript any warning
      "@typescript-eslint/no-explicit-any": "off",

      // Turn off prefer-const
      "prefer-const": "off",

      // Allow <img> without Next.js Image warning
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
