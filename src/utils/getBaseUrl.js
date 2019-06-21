export default function getBaseUrl(defaultLang, lang) {
  if (defaultLang !== lang) {
    return `${lang}/`;
  }

  return '';
}
