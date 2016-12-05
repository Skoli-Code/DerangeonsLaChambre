/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';

import Ballots from './Ballots';
import fetch from '../../../core/fetch';
import history from '../../../core/history';

let globBallots;

const resolveBallots = async() => {
  try {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `{ballots{
          list{id,order,title,subtitle,legend_title,content,results{party{id,order,name,color},seats}},
          parties{id,order,name,color}
        }}`
      })
    });
    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }
    const {data} = await resp.json();
    if (!data){
      return undefined;
    }
    return data.ballots;
  } catch(e){
    return null;
  }
};

const routeParams = {
  key: 1,
  title: 'Scrutins'
};

const render = async(index) => {
  globBallots = globBallots || await resolveBallots();
  if(globBallots && !index){
    index = 0;
  }

  let onBallotChange = (index)=>{
    history.push('/%C3%A9tude/scrutins/'+index);
  };

  return Object.assign({}, routeParams, {
    componentProps: {
      onBallotChange: onBallotChange,
      ballots: globBallots.list,
      parties: globBallots.parties,
      activeBallot: index
    },
    component: Ballots
  });
};

export default {
  path : '/scrutins',
  async action(context) {
    if(context){
      return await context.next();
    } else {
      return render();
    }
  },
  children : [
    {
      path: '/',
      async action(){
        return render();
      }
    }, {
      path: '/:index',
      async action(context) {
        return render(+context.params.index);
      }
    }
  ]

};
