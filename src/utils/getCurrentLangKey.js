/**
 * /blog/ja/aaa, [en, ja], en, /blog -> ja
 * /blog/zh-hans/aaa, [en, ja], en, /blog -> en
 * /ja/aaa, [en, ja], en, /blog -> ja
 *
 * @param {*} url
 * @param {*} langList
 * @param {*} defaultLang
 * @param {*} pathPrefix
 */
const getCurrentLangKey = (url, langList, defaultLang, pathPrefix = '') => {
  url = url.replace(new RegExp(`^${pathPrefix}/`), '/');

  const langKey = url.split('/')[1];

  return langList.includes(langKey) ? langKey : defaultLang;
};

export default getCurrentLangKey;
