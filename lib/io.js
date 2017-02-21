const fs = require('fs');

module.exports = {
  readFile: file =>
    new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (err, contents) => {
        if (err) reject(err);
        resolve(contents);
      });
    }),

  writeFile: (file, content) =>
    new Promise((resolve, reject) => {
      fs.writeFile(file, content, err => {
        if (err) reject(err);
        resolve();
      });
    })
}
