const fs = require('fs');
const markdown = require('markdown').markdown;
import { logger } from '../utils';

const convert = ({ source, destination }, options = {}) => {
  const { log: logType } = options;

  readFile(source)
    .then((mdStr) => {
      return markdown.toHTML(mdStr); // 返回的结果作为下个回调的参数
    })
    .then((html) => {
      try {
        writeFile(destination, html);
        logger
          .setType(logType)
          .info(`success: copy '${source}' to '${destination}'`);
      } catch (error) {
        logger.error(`copy error: ${error}`);
      }
    })
    .catch((e) => {
      console.log(e);
    });

  function readFile(url) {
    let promise = new Promise((resolve, reject) => {
      fs.readFile(url, 'utf-8', (err, str) => {
        if (err) {
          reject(new Error('readFile error'));
        } else {
          resolve(str);
        }
      });
    });
    return promise;
  }

  function writeFile(url, data) {
    let promise = new Promise((resolve, reject) => {
      fs.writeFile(url, data, (err, str) => {
        if (err) {
          reject(new Error('writeFile error'));
        } else {
          resolve();
        }
      });
    });
    return promise;
  }
};

export default convert;
