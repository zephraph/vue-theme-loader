'use strict';

const compiler = require('vue-template-compiler');

const STYLE_TAGS = /<style[^>]*>/gm
const ATTRS = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g

const forEachMatch = (regex, string, action) => {
  let match;

  while (match = regex.exec(string)) {
    action(match);
  }
}

const parseStyleTags = source => {
  let matches = [];
  forEachMatch(STYLE_TAGS, source, match => matches.push(match[0]));
  return matches;
}

const parseAttributes = tag => {
  let attrs = {};
  forEachMatch(ATTRS, tag, match => attrs[match[1]] = match[2]);
  return attrs;
}

const parse = source => {
  const output = compiler.parseComponent(source, { pad: false });
  const tags = parseStyleTags(source);
  const attrs = tags.map(tag => parseAttributes(tag));
  output.styles = output.styles.map((style, i) =>
    Object.assign({}, style, { attrs: attrs[i] })
  );
  return output;
}

module.exports = function(source) {
  const output = parse(source);

  output.styles.forEach(style => {
    console.log(style);
  })
}

Object.assign(module.exports, {
  forEachMatch: forEachMatch,
  parseStyleTags: parseStyleTags,
  parseAttributes: parseAttributes,
  parse: parse
});
