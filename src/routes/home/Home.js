/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Home.css';

function Home() {
  return (
    <Layout>
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>Dérangeons la Chambre</h1>
          <h2 className={s.subtitle}>Une étude des différents mode de scrutins</h2>

          <Link to="/%C3%A9tude/introduction" className={s.btn}>Dérangez la chambre</Link>
        </div>
      </div>
    </Layout>
  );
}

Home.propTypes = {};

export default withStyles(s)(Home);
