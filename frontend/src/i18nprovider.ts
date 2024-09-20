import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "./language/es";

export const i18nProvider = polyglotI18nProvider(
  (locale) => spanishMessages,
  "es"
);
