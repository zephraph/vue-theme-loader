const readFile = require('./lib/io').readFile;
const loader = require('./index');

test('parseAttributes() should return the attributes from a given tag', () => {
  const result = loader.parseAttributes('<style lang="stylus" theme="brand">');
  expect(result).toEqual({
    lang: 'stylus',
    theme: 'brand'
  });
});

test('parseStyleTags() should return the style tags in the given source', done => {
  readFile('./fixtures/normalComponent.vue').then(src => {
    const result = loader.parseStyleTags(src);
    expect(result).toEqual(['<style test="true">']);
    done();
  });
});

test('parse() should returned parsed component', done => {
  readFile('./fixtures/styleOnly.vue').then(src => {
    const result = loader.parse(src);
    expect(result).toMatchSnapshot();
    done();
  });
});

test('loader() should do things', done => {
  readFile('./fixtures/css.vue').then(src => {
    const result = loader(src);
    done();
  });
});
