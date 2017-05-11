import { handleOptions, LoaderOptions } from './';
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

test('handleOptions() expect default state to be no theme with devMode enabled', async () => {
  const options = { theme: '', devMode: true };
  const fakeLoader = (context: LoaderOptions) => context;

  expect(handleOptions(options, fakeLoader)).toEqual({
    theme: '',
    devMode: true
  });
});
