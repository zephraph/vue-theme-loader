import { join } from 'path';
import { readdirSync } from 'fs';
import { readFile } from '../src/io';
import { removeOtherThemes } from '../src';

const tests = readdirSync(join(__dirname, 'cases'))
  .filter(name => name.endsWith('in.vue'))
  .map(name => name.split('.')[0]);

describe('use-cases', () => {
  tests.forEach(testName =>
    it(testName, async () => {
      const input = await readFile(join(__dirname, 'cases', `${testName}.in.vue`));
      const output = await readFile(join(__dirname, 'cases', `${testName}.out.vue`));
      expect(removeOtherThemes(input, 'test')).toBe(output);
    })
  );
});
