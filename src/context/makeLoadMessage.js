const textCache = {};

function makeLoadMessage(defaultLang = 'en') {
  return function loadMessage(lang) {
    let result = textCache[lang];
    if (!result) {
      // get default language's definitions
      const defMsgs = lang === defaultLang ? {} : loadMessage(defaultLang);

      // merge with default definitions
      result = {
        ...defMsgs,
        ...require(`../../config/locales/${lang}.js`),
      };
      textCache[lang] = result;
    }

    return result;
  };
}

export default makeLoadMessage;
