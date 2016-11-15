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

const resolveBallots = async() => {
  try {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `{
          ballots
          {
            list{
              id,order,content,results{
                party,result
              }
            },
            parties{
              id,order,name
            }
          }
        }`
      })
    });
    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }
    const {data} = resp.json();
    if (!data){
      return undefined;
    }
    return data;
  } catch(e){
    console.error(e)
    return null;
  }
};

const render = async(id = null) => {
  let ballots = await resolveBallots();
  if(ballots){
    ballots = ballots.sort((b1,b2)=>b1.order - b2.order);
  }
  return {key: 1, title: 'Scrutins', component: <Ballots ballots={ballots} activeBallot={id}/>};
};

export default {

  path : '/scrutins',
  render : render,
  async action({next}) {
    return next();
  },
  children : [
    {
      path: '/',
      action: render
    }, {
      path: '/:id',
      async action(context) {
        return render(context.params.id);
      }
    }
  ]

};
