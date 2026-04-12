// @ts-check
import cspellPlugin from "@cspell/eslint-plugin";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  plugins: {
    "@cspell": cspellPlugin,
  },
  rules: {
    "no-console": ["warn", { allow: ["error", "warn", "info"] }],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "vue/attributes-order": "off", //На самой рекомендаций, говорится, что эт страница устарела
    "vue/require-default-prop": "off",
    "vue/html-self-closing": "off", //Какой-то пользы от закрытия void-элов нет, даже теряется совместимость с xhtml,
    "@typescript-eslint/no-import-type-side-effects": "warn",
    "no-empty": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@cspell/spellchecker": [
      "warn",
      {
        language: "en,ru",
        checkIdentifiers: true, // Проверка имен переменных/функций
        checkStrings: true,
        checkTemplates: true, // Проверка шаблонных строк
      },
    ],
  },
});
