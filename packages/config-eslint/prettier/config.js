/**
 * @type {import("prettier").Config}
 */
export const defaultConfigObject = {
  printWidth: 100,
  quoteProps: "consistent",

  importOrder: ["^@types/(.*)$", "<THIRD_PARTY_MODULES>", "^@envisim/(.*)$", "^[$]", , "^[./]"],
};

/**
 * @type {import("prettier").Config.overrides}
 */
export const defaultOverrides = [
  {
    files: ["*.ts", "*.js", "*.mjs", "*.cjs"],
    options: {
      plugins: ["@trivago/prettier-plugin-sort-imports"],
    },
  },
  {
    files: ["package.json"],
    options: {
      plugins: ["prettier-plugin-packagejson"],
    },
  },
];

/**
 * @returns {import("prettier").Config}
 */
export function config(overrides) {
  return { ...defaultConfigObject, overrides };
}

/**
 * @returns {import("prettier").Config}
 */
export default config(defaultOverrides);
