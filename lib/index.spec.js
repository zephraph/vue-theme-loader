import { readFile } from './io';
import {
  parse,
  removeOtherThemes,
  removeStyleBlock
} from './index';

test('removeStyleBlock()', async () => {
  const source = await readFile('./fixtures/normalComponent.vue');
  expect(removeStyleBlock(source, parse(source).styles[0])).toMatchSnapshot()
});

test('removeOtherThemes() not modify anything if theme undefined', async () => {
  const source = await readFile('./fixtures/normalComponent.vue');
  expect(removeOtherThemes(source)).toMatchSnapshot();
});

test('removeOtherThemes() should remove unmatching theme', async () => {
  const source = await readFile('./fixtures/themed.vue');
  expect(removeOtherThemes(source, 'brand1')).toMatchSnapshot();
});
