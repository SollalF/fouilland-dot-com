import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import unicornPlugin from "eslint-plugin-unicorn";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: [
            // Add any patterns to ignore here if needed
            // e.g., /next-env\.d\.ts/,
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
