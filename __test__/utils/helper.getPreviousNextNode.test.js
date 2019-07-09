import { getPreviousNextNode } from '../../src/utils/helpers';

const Posts = [
  {
    node: 'post0',
  },
  {
    node: 'post1',
  },
  {
    node: 'post2',
  },
  {
    node: 'post3',
  },
  {
    node: 'post4',
  },
];

test('posts is empty', () => {
  const result1 = getPreviousNextNode([], 1);
  const result2 = getPreviousNextNode([], -1);
  const expected = { previous: undefined, next: undefined };
  expect(result1).toEqual(expected);
  expect(result2).toEqual(expected);
});

test('fromInd is -1', () => {
  const result = getPreviousNextNode(Posts, -1);
  const expected = { previous: undefined, next: undefined };
  expect(result).toEqual(expected);
});

test('fromInd is 0', () => {
  const result = getPreviousNextNode(Posts, 0);
  const expected = { previous: null, next: 'post1' };
  expect(result).toEqual(expected);
});

test('fromInd is the lastone', () => {
  const result = getPreviousNextNode(Posts, 4);
  const expected = { previous: 'post3', next: null };
  expect(result).toEqual(expected);
});

test('fromInd is the lastone', () => {
  const result = getPreviousNextNode(Posts, 2);
  const expected = { previous: 'post1', next: 'post3' };
  expect(result).toEqual(expected);
});
