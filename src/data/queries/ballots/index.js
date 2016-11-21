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

export default {
  type: BallotsType,
  async resolve() {
    const parsedBallots = ballots.map(async (ballot)=>{
      const path    = join(BALLOTS_DIR, ballot.id + '.md');
      const content = await readFile(path, { encoding: 'utf8' });
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
