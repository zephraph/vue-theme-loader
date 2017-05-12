# vue-theme-loader
A webpack loader for supporting multi-site theming with Vue.js

*Before*

```vue
<!-- Vue single component file -->

<style>
  button {
    border: 1px solid black;
  }
</style>

<style theme="brand1">
  button {
    color: red;
  }
</style>

<style theme="brand2">
  button {
    color: blue;
  }
</style>
```

*After* (with the `theme` option set to brand1)

```vue
<!-- Vue single component file -->

<style>
  button {
    border: 1px solid black;
  }
</style>

<style theme="brand1">
  button {
    color: red;
  }
</style>
```

## Configuring webpack

It's important to remember that webpack resolves loaders from right to left so `vue-theme-loader` must always go under `vue-loader`. 

```js
module.exports = {
  module: {
    rules: [
     {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          },
          { 
            loader: 'vue-theme-loader',
            options: {
              theme: 'test1'
            }
          }
        ]
      }
    ]
  }
};
```
