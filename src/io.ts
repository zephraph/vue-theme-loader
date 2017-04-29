import { readFile as read, writeFile as write } from 'fs';

export const readFile = (file: string) =>
  new Promise((resolve, reject) => {
    read(file, 'utf8', (err, contents) => {
      if (err) reject(err);
      resolve(contents);
    });
  });

export const writeFile = (file: string, content: string) =>
  new Promise((resolve, reject) => {
    write(file, content, err => {
      if (err) reject(err);
      resolve();
    });
  })