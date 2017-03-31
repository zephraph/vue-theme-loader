import { parseComponent } from 'vue-template-compiler';
import loaderUtils from 'loader-utils';

export const parse = source => parseComponent(source, { pad: false });

export const removeStyleBlock = (source, styleDescriptor) => {
  let start = source.lastIndexOf('<', styleDescriptor.start);
  let end = source.indexOf('>', styleDescriptor.end);
  let lines = source.slice(start, end).split('\n').length;
  return source.substring(0, start)
    + Array(lines).fill('').join('\n')
    + source.substring(end + 1, source.length);
}

export const removeOtherThemes = (source, theme) => {
  let { styles } = parse(source);

  for(let i = 0; i < styles.length; ++i) {
      let style = styles[i];
      if (style.attrs.theme && style.attrs.theme !== theme) {
        return removeOtherThemes(removeStyleBlock(source, style));
      }
  }
  return source;
}

export default function vueThemeLoader(source) {
  const { theme } = loaderUtils.getOptions(this);
  const descriptor = parse(source);

  return removeOtherThemes(descriptor, theme);
}
