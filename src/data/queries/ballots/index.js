import fs from 'fs';
import fm from 'front-matter';
import MarkdownIt from 'markdown-it';
import { join } from 'path';

const md = new MarkdownIt();
const BALLOTS_DIR = join(__dirname, './content/ballots');


import ballots from './ballots.json';
import results from './results.json';
import parties from './parties.json';

import BallotsType from '../queries/ballot';

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const readFile = (fn)=>{
  let path = join(CONTENT_DIR, fn);
  return new Promise(resolve => {
    fs.readFile(path, resolve);
  });
};

const parseContent = (fileContent)=>{
  const fmContent = fm(fileContent);
  return md.render(fmContent.body);
};

const ballots = {
  type: BallotsType,
  async resolve({ request }) {
    const parsedBallots = ballots.map((ballot)=>{
      const ballotId = ballot.id;
      const content = await readFile(`${ballot.id}.md`);
      return Object.assign({}, ballot, {
        results: results.find((res)=>{ res.id == ballot.id})
        content: parseContent(content)
      });
    });
    return {
      parties: parties,
      ballots: parsedBallots
    }
  }
};

export default ballots;
