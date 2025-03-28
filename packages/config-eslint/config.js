import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import path from "node:path";
import ts from "typescript-eslint";

/**
 * @type {import("eslint").Linter.Config.Rules}
 */
const tsRules = {
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        fixStyle: "inline-type-imports",
        prefer: "type-imports",
      },
    ],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-loss-of-precision": "off",
    "@typescript-eslint/no-redundant-type-constituents": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/strict-boolean-expressions": "warn",
  },
};

/**
 * @param {string} tsconfigRootDir
 * @returns {import("eslint").Linter.Config}
 */
export function tsConfigObject(tsconfigRootDir) {
  return {
    name: "typescript",
    files: ["**/!(*.svelte).ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir,
      },
    },
  };
}

/**
 * @param {string} rootDir
 * @returns {import("eslint").Linter.Config}
 */
export default function config(rootDir) {
  const ignoreFile =
    rootDir === undefined ? {} : includeIgnoreFile(path.join(rootDir, ".gitignore"));

  return ts.config(
    ignoreFile,
    js.configs.recommended,
    ts.configs.recommendedTypeChecked,
    tsRules,
    prettier,

    tsConfigObject(rootDir),
  );
}
