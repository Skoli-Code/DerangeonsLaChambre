import fs from 'fs';
import { join } from 'path';
import Promise from 'bluebird';

import ballots from './ballots.json';
import parties from './parties.json';

import {BallotsType} from '../../types/BallotsType';

const BALLOTS_DIR = join(__dirname, './content/ballots');

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const readFile = Promise.promisify(fs.readFile);

export default {
  type: BallotsType,
  async resolve() {
    const orderedBallots = ballots.sort((a,b)=>a.order - b.order);
    const parsedBallots = orderedBallots.map(async (ballot)=>{
      ballot.results = ballot.results.map(async (r)=>{
        r.party = parties.find((p)=>p.id == r.party);
        return r;
      });
      const path    = join(BALLOTS_DIR, ballot.id + '.md');
      const content = await readFile(path, { encoding: 'utf8' });
      return Object.assign({content: content}, ballot);
    });
    return {
      parties: parties,
      list: parsedBallots
    }
  }
};
