import { parseComponent, SFCBlock, SFCDescriptor } from 'vue-template-compiler';
import { getOptions } from 'loader-utils';

export const parse = (source: string): SFCDescriptor => 
  parseComponent(source, { pad: false });

export const removeStyleBlock = (source: string, styleDescriptor) => {
  let start = source.lastIndexOf('<', styleDescriptor.start);
  let end = source.indexOf('>', styleDescriptor.end);
  let lines = source.slice(start, end).split('\n').length;
  return source.substring(0, start)
    + Array(lines).map(() => '\n')
    + source.substring(end + 1, source.length);
}

export const removeOtherThemes = (source: string, theme?: string): string => {
  let styles: SFCBlock[] = parse(source).styles;

  for(let i = 0; i < styles.length; ++i) {
      let style = styles[i];
      if (style.attrs.theme && style.attrs.theme !== theme) {
        return removeOtherThemes(removeStyleBlock(source, style));
      }
  }
  return source;
}

export type LoaderOptions = {
  theme: string
};

export default function vueThemeLoader(this: LoaderOptions, source: string, options?: LoaderOptions) {
  const specifiedOpts = options || getOptions<LoaderOptions>(this);
  let theme;

  if (specifiedOpts) {
    theme = specifiedOpts.theme;
  }

  return removeOtherThemes(source, theme);
}
