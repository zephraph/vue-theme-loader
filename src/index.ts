import { parseComponent, SFCBlock, SFCDescriptor } from 'vue-template-compiler';
import { getOptions } from 'loader-utils';

export const parse = (source: string): SFCDescriptor =>
  parseComponent(source, { pad: false });

/**
 * Given the source of an SFC and a parsed styleblock from an SFC, this method will remove
 * the given style block and return the resulting source.
 *
 * Note that whitespace is preserved for debugging purposes
 */
export const removeStyleBlock = (source: string, styleDescriptor: SFCBlock): string => {
  const start = source.lastIndexOf('<', styleDescriptor.start);
  const end = source.indexOf('>', styleDescriptor.end);
  const lines = source.slice(start, end).split('\n').length;
  return source.substring(0, start)
    + Array(lines).map(() => '').join('\n')
    + source.substring(end + 1, source.length);
};

/**
 * Given the source of an SFC and the name of a theme, this method will remove all
 * style blocks that have a theme attribute specified whose value does not equal the
 * given theme name. It will not remove style blocks without a theme attribute specified.
 */
export const removeOtherThemes = (source: string, theme?: string): string => {
  const styles: SFCBlock[] = parse(source).styles;

  for (const style of styles) {
      if (style.attrs.theme && style.attrs.theme !== theme) {
        return removeStyleBlock(source, style);
      }
  }
  return source;
};

export interface LoaderOptions {
  theme: string;
  devMode: boolean;
}

export default function vueThemeLoader(this: LoaderOptions, source: string, options?: LoaderOptions) {
  const specifiedOpts = options || getOptions<LoaderOptions>(this);
  let theme;
  let devMode;

  if (specifiedOpts) {
    ({ theme, devMode } = specifiedOpts);
  }

  devMode = devMode || process.env.NODE_ENV !== 'production';

  return devMode
    ? source
    : removeOtherThemes(source, theme);
}
