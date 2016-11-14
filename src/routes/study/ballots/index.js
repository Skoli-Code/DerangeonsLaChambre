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

const resolveBallots = async ()=>{
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `{ballots(){id,content,results,order}}`,
    }),
    // credentials: 'include',
  });
  if (resp.status !== 200) throw new Error(resp.statusText);
  const { data } = await resp.json();
  if (!data ) return undefined;
  return data;
};

const render = async (id=null)=>{
  console.log('render !');
  const ballots = (await resolveBallots()).sort((a,b)=>a.order - b.order);

  return {
    key: 2,
    title: 'Ballots',
    component: <Ballots ballots={ ballots } activeBallot={ id }/>
  }
};

export default {

  path: '/scrutins',
  async action(activeKey){
    console.log(activeKey);
    debugger;
    console.log('resolving ballots children');
    const params = {
      title: 'Scrutins',
      key: 1
    };
    const isActive = activeKey == params.key;
    return Object.assign({}, {
      component: <div></div>
    }, params);
  },
  children: [
    {
      path: '/',
      action: render
    },
    {
      path: '/:id',
      action: async (context)=>{
        return render(context.params.id);
      }
    }
  ]

};
