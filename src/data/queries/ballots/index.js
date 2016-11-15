import fs from 'fs';
import fm from 'front-matter';
import MarkdownIt from 'markdown-it';
import { join } from 'path';
import Promise from 'bluebird';

import ballots from './ballots.json';
import results from './results.json';
import parties from './parties.json';

import {BallotsType} from '../../types/BallotsType';

const md = new MarkdownIt();
const BALLOTS_DIR = join(__dirname, './content/ballots');

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

async function readFile(fn){
  const path = join(BALLOTS_DIR, fn);
  return new Promise(resolve => {
    fs.readFile(path, resolve);
  });
}

const parseContent = (fileContent)=>{
  const fmContent = fm(fileContent);
  return md.render(fmContent.body);
};

export default {
  type: BallotsType,
  async resolve() {
    const parsedBallots = ballots.map(async (ballot)=>{
      const fn = ballot.id + '.md';
      const content = await readFile(fn);
      return Object.assign({}, ballot, {
        results: results.find((res)=>res.id == ballot.id).results,
        content: parseContent(content)
      });
    });
    return {
      parties: parties,
      list: parsedBallots
    }
  }
};
