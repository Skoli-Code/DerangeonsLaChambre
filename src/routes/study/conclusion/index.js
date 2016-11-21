/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';

import Conclusion from './Conclusion';

export default {
  path: '/conclusion',
  async action() {
    return {
      component: Conclusion,
      title: 'Conclusion',
      key: 2
    };
  }

};
