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


const readFile = Promise.promisify(fs.readFile);

const parseContent = async (fn)=>{
  const path = join(BALLOTS_DIR, fn);
  const source = await readFile(path, { encoding: 'utf8' });
  const fmContent = fm(source);
  console.log('fmContent: ', fmContent);
  return md.render(fmContent.body);
};

export default {
  type: BallotsType,
  async resolve() {
    const parsedBallots = ballots.map(async (ballot)=>{
      const content = parseContent(ballot.id + '.md');
      console.log('filePath - content', content);
      return Object.assign({}, ballot, {
        results: results.find((res)=>res.id == ballot.id).results,
        content: content
      });
    });
    return {
      parties: parties,
      list: parsedBallots
    }
  }
};
