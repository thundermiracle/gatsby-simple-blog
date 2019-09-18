/* eslint-disable react-hooks/rules-of-hooks */
import { useLang } from 'context/LanguageContext';
import { formatPostDate } from 'utils/helpers';

const formatMessage = (msgId, ...args) => {
  const { lang, messages } = useLang();

  const msg = messages[msgId];

  if (msg == null) {
    console.error(`MessageId [${msgId}] is not exist!!
    You should add it to config/locales/${lang}.js`);
    return msgId;
  }

  if (typeof msg === 'function') {
    return msg(...args);
  }

  return msg;
};

const formatDate = dateStr => {
  const { lang } = useLang();

  return formatPostDate(dateStr, lang);
};

export { formatMessage, formatDate };
