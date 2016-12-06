/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';

class Footer extends React.Component {
  render(){
    return (
      <div className={s.root}>
        <div className={s.container}>
          <span className={s.text}>© <Link className={s.link} to="http://skoli.fr" rel="nofollow" target="_blank" label="Skoli"/></span>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/">Acceuil</Link>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/">Mentions Légales</Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
