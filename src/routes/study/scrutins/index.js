/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';

import Scrutins from './Scrutins';

export default {

  path: '/scrutins',

  async action(activeKey) {
    const params = {
      title: 'Scrutins',
      key: 1
    };
    const isActive = activeKey == params.key;

    return Object.assign({}, {
      component: <Scrutins includeHelmet={ isActive }/>
    }, params);
  },

};
