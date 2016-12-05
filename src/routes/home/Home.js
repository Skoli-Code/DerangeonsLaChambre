/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Home.css';

function Home() {
  return (
    <Layout>
      <Helmet title="Acceuil | Dérangeons la Chambre"/>
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>Dérangeons la Chambre</h1>
          <h2 className={s.subtitle}>Assemblée Nationale : et si on changeait les règles du jeu ?</h2>

          <Link to="/%C3%A9tude/introduction" className={s.btn}>Dérangez la chambre</Link>
        </div>
      </div>
    </Layout>
  );
}

Home.propTypes = {};

export default withStyles(s)(Home);
