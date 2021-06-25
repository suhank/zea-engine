import { sum } from './ts-fn';

test('typescript test', () => {
  expect(sum()).toBe(0);
});

test('typescript test 2', () => {
  expect(sum(1, 2)).toBe(3);
});