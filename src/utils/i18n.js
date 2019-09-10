import { useContext } from 'react';

import { formatPostDate } from './helpers';

import LanguageContext from '../context/LanguageContext';
import { site } from '../../config';

const textCache = {};
const getAllMsg = lang => {
  let result = textCache[lang];
  if (!result) {
    // get default language's definitions
    const defMsgs = lang === site.lang ? {} : getAllMsg(site.lang);

    // merge with default definitions
    result = {
      ...defMsgs,
      ...require(`../../config/locales/${lang}.js`),
    };
    textCache[lang] = result;
  }

  return result;
};

const formatMessage = (msgId, ...args) => {
  const { lang } = useContext(LanguageContext);

  const allMsg = getAllMsg(lang);
  const msg = allMsg[msgId];

  if (typeof msg === 'function') {
    return msg(...args);
  }

  return msg;
};

const formatDate = dateStr => {
  const { lang } = useContext(LanguageContext);

  return formatPostDate(dateStr, lang);
};

export { formatMessage, formatDate };
