import { readFile as read, writeFile as write } from 'fs';

/**
 * Simple promise wrapper around node's readFile
 */
export const readFile = (file: string): Promise<string> =>
  new Promise((resolve, reject) => {
    read(file, 'utf8', (err, contents) => {
      err
        ? reject(err)
        : resolve(contents);
    });
  });

/**
 * Simple promise wrapper around node's writeFile
 */
export const writeFile = (file: string, content: string) =>
  new Promise((resolve, reject) => {
    write(file, content, err => {
      err
        ? reject(err)
        : resolve();
    });
  });
