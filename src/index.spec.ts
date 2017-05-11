import { readFile } from './io';
import load, {
  parse,
  removeOtherThemes,
  removeStyleBlock
} from './index';

test('parse()', async () => {
  const source = await readFile('./fixtures/normalComponent.vue');
  const result = parse(source);
  expect(result.styles.length).toEqual(2);
  expect(result.styles[0].attrs.test === 'true');
  expect(result.styles[1].attrs.test === {});
  expect(result.styles[0].content).toMatchSnapshot();
});

test('removeStyleBlock() should remove specified (2nd) style block', async () => {
  const source = await readFile('./fixtures/themed.vue');
  expect(removeStyleBlock(source, parse(source).styles[1])).toMatchSnapshot()
});

test('removeOtherThemes() not modify anything if theme undefined', async () => {
  const source = await readFile('./fixtures/normalComponent.vue');
  expect(removeOtherThemes(source)).toMatchSnapshot();
});

test('removeOtherThemes() should remove unmatching theme', async () => {
  const source = await readFile('./fixtures/themed.vue');
  expect(removeOtherThemes(source, 'brand1')).toMatchSnapshot();
});

// test('loader should only render theme', async () => {
//   const source = await readFile('./fixtures/themed.vue');
//   expect(load(source, { theme: 'brand1'})).toMatchSnapshot();
// })
