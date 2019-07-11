import getBaseUrl from '../../src/utils/getBaseUrl';

test('return /{lang} if different with langDefault', () => {
  const result = getBaseUrl('en', 'ja');
  expect(result).toEqual('/ja/');
});

test('return / if same', () => {
  const result = getBaseUrl('en', 'en');
  expect(result).toEqual('/');
});
