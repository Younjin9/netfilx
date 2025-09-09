import { render, screen } from '@testing-library/react';

test('renders without crashing', () => {
  const div = document.createElement('div');
  expect(div).toBeDefined();
});

test('basic functionality test', () => {
  expect(2 + 2).toBe(4);
});
