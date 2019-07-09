import { languageOper } from '../../../src/utils/IIFE';

test('should be able to set lang to window', () => {
  languageOper();
  window.__setPreferredLang('en');
  expect(window.__getPreferredLang()).toEqual('en');

  window.__setPreferredLang('ja');
  expect(window.__getPreferredLang()).toEqual('ja');
});
