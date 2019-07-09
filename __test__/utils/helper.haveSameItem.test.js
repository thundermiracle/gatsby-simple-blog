import { haveSameItem } from '../../src/utils/helpers';

test('should false when para1 is null', () => {
  const result = haveSameItem(null, ['a']);
  expect(result).toEqual(false);
});

test('should false when para2 is null', () => {
  const result = haveSameItem(['ab'], null);
  expect(result).toEqual(false);
});

test('should false when para1, para2 is not same', () => {
  const result = haveSameItem(['ab'], ['a', 'b']);
  expect(result).toEqual(false);
});

test('should false when para1, para2 is same', () => {
  const result = haveSameItem(['b', 'a'], ['a', 'b']);
  expect(result).toEqual(true);
});
