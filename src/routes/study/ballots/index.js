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

const routeParams = {
  key: 1,
  title: 'Scrutins'
};

const render = async(index) => {
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `{ballots{
        list{
          id,order,title,subtitle,legend_title,content,
          meta{
            ... on TwitterMeta{name,content}
            ... on FacebookMeta{property,content}
          }
          results{party{id,order,name,color},seats}},
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

  const ballots = data.ballots;

  if(ballots && !index){
    index = 0;
    // history.push('/etude/scrutins/0')
  }

  const ballot = ballots.list[index];

  const onBallotChange = (i)=>{
    const path = '/etude/scrutins/'+i;
    history.push(path);
  };

  return Object.assign({}, routeParams, {
    componentProps: {
      onBallotChange: onBallotChange,
      ballots: ballots.list,
      parties: ballots.parties,
      activeBallot: index
    },
    component: Ballots,
    meta: ballot.meta
  });
};

export default {
  path : '/scrutins',
  async action(context) {
    if(context){
      return context.next();
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
