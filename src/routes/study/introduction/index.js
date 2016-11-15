/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';

import Introduction from './Introduction';

export default {

  path: '/introduction',

  async render(activeKey){
    const params = {
      title: 'Introduction',
      key: 0
    };
    const isActive = activeKey == params.key;
    return Object.assign({}, {
      component: <Introduction includeHelmet={ isActive }/>
    }, params);
  },
  async action() {
    return this.render();
  }
};
