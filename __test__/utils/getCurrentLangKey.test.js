import getCurrentLangKey from 'utils/getCurrentLangKey';

const defaultLang = 'en';
const langList = ['en', 'ja'];
const pathPrefix = '/blog';

describe('url contains pathPrefix', () => {
  test('url contains default lang', () => {
    const url = '/blog/en/hello-world/';

    const langKey = getCurrentLangKey(url, langList, defaultLang, pathPrefix);

    expect(langKey).toEqual('en');
  });

  test('url contains lang exist in langList', () => {
    const url = '/blog/ja/hello-world/';

    const langKey = getCurrentLangKey(url, langList, defaultLang, pathPrefix);

    expect(langKey).toEqual('ja');
  });

  test('url contains lang not exist in langList', () => {
    const url = '/blog/zh-hans/hello-world/';

    const langKey = getCurrentLangKey(url, langList, defaultLang, pathPrefix);

    expect(langKey).toEqual(defaultLang);
  });

  test('pathPrefix is not passed', () => {
    const url = '/blog/ja/hello-world/';

    const langKey = getCurrentLangKey(url, langList, defaultLang);

    expect(langKey).toEqual(defaultLang);
  });
});

describe('url does not contain pathPrefix', () => {
  test('url contains default lang', () => {
    const url = '/en/hello-world/';

    const langKey = getCurrentLangKey(url, langList, defaultLang);

    expect(langKey).toEqual('en');
  });

  test('url contains lang exist in langList', () => {
    const url = '/ja/hello-world/';

    const langKey = getCurrentLangKey(url, langList, defaultLang);

    expect(langKey).toEqual('ja');
  });

  test('url contains lang not exist in langList', () => {
    const url = '/zh-hans/hello-world/';

    const langKey = getCurrentLangKey(url, langList, defaultLang);

    expect(langKey).toEqual(defaultLang);
  });

  test('pathPrefix is passed', () => {
    const url = '/ja/hello-world/';

    const langKey = getCurrentLangKey(url, langList, defaultLang, pathPrefix);

    expect(langKey).toEqual('ja');
  });
});
