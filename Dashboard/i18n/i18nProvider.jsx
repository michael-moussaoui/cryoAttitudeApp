import frenchMessages from "ra-language-french";
import polyglotI18nProvider from "ra-i18n-polyglot";

const i18nProvider = polyglotI18nProvider(() => frenchMessages, "fr");

export default i18nProvider;
