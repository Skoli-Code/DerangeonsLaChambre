/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import fs from 'fs';
import { join } from 'path';
import Promise from 'bluebird';
import fm from 'front-matter';

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ContentType from '../types/ContentType';

// A folder with Markdown/HTML content pages
const CONTENT_DIR = join(__dirname, './content');

const readFile = Promise.promisify(fs.readFile);
const fileExists = filename => new Promise(resolve => {
  fs.exists(filename, resolve);
});


async function resolveFileName(path) {
  let fileNameBase = join(CONTENT_DIR, `${path === '/' ? '/index' : path}`);
  let fileName = fileNameBase + '.md';

  if (!(await fileExists(fileName))) {
    fileNameBase = join(CONTENT_DIR, `${path}/index`);
    fileName = fileNameBase + '.md';
  }

  if (!(await fileExists(fileName))) {
    return { success: false };
  }

  return { success: true, fileName };
}

const content = {
  type: ContentType,
  args: {
    path: { type: new NonNull(StringType) },
  },
  async resolve({ request }, { path }) {
    const { success, fileName } = await resolveFileName(path);
    if(!success){ return null; }
    const fileContent = await readFile(fileName, {encoding: 'utf8'});
    const fmContent = fm(fileContent);
    return Object.assign({ path, content: fileContent }, fmContent.attributes);
  },
};

export default content;
