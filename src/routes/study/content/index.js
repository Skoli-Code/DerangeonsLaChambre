/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Content from './Content';
import fetch from '../../../core/fetch';
import {extendConfig} from '../../../components/Socials/Config'; 

const configureRoute = ({path,title,key,mobileIcon,isModal,helmetProps})=>{
  return {
    path: '/'+encodeURIComponent(path),
    async action() { // eslint-disable-line react/prop-types
      const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `{content(path:"${path}"){path,content}}`,
        }),
        credentials: 'include',
      });
      if (resp.status !== 200) throw new Error(resp.statusText);
      const { data } = await resp.json();
      if (!data || !data.content) return undefined;
      return {
        isModal,
        mobileIcon,
        key,
        title,
        componentProps: Object.assign({}, {title, helmetProps}, data.content),
        component: Content
      };
    }
  }
};


export default configureRoute;
