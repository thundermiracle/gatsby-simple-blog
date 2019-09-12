import { kebabCase } from '../../src/utils/helpers';

test('camelCase', () => {
  const result = kebabCase('camelCase');
  expect(result).toEqual('camel-case');
});

test('some text', () => {
  const result = kebabCase('some text');
  expect(result).toEqual('some-text');
});

test('ThisIsATest', () => {
  const result = kebabCase('ThisIsATest');
  expect(result).toEqual('this-is-a-test');
});

test('some-mixed_string With spaces_underscores-and-hyphens', () => {
  const result = kebabCase('some-mixed_string With spaces_underscores-and-hyphens');
  expect(result).toEqual('some-mixed-string-with-spaces-underscores-and-hyphens');
});

test('AllThe-small Things', () => {
  const result = kebabCase('AllThe-small Things');
  expect(result).toEqual('all-the-small-things');
});

test('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML', () => {
  const result = kebabCase(
    'IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML',
  );
  expect(result).toEqual(
    'i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-some-xml-and-html',
  );
});

test('生活', () => {
  const result = kebabCase('生活');

  expect(result).toEqual('生活');
});
