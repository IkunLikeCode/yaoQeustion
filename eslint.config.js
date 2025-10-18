import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import globals from "globals";
import eslintConfigVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

const ignore = ["**/node_modules/**", "dist/**/*", ".*", "**/*.d.{ts,js}"];

export default [
  // 忽略文件配置
  {
    ignores: ignore
  },
  // 基础配置
  eslint.configs.recommended,
  // TypeScript配置 允许使用any
  ...tseslint.configs.recommended,
  // Vue 推荐规则（Flat Config）
  ...eslintConfigVue.configs["flat/recommended"],
  // Prettier配置
  eslintConfigPrettier,
  // 自定义配置
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        // 让 <script lang="ts"> 使用 TypeScript 解析器
        parser: tseslint.parser,
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      "no-var": "error",
      // 在编辑器中将 Prettier 报错为警告，便于统一格式
      "prettier/prettier": "warn",
      "@typescript-eslint/no-explicit-any": "off"
    },
    plugins: {
      prettier: eslintPluginPrettier,
      vue: eslintConfigVue
    }
  }
];
