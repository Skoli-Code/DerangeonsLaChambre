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
import RaisedButton from 'material-ui/RaisedButton';
import Layout from '../../components/Layout';
import {extendMeta} from '../../components/Socials/Config';
import Link from '../../components/Link';
import {Logo} from '../../components/Pictos';
import s from './Home.css';
// import theme from '../../components/theme';

function Home() {
  const meta = extendMeta([
    { name:'og:image', content:'http://www.derangeonslachambre.fr/cover.jpg'},
    { name:'twitter:image', content:'http://www.derangeonslachambre.fr/cover.jpg'}
  ]);
  return (
    <Layout>
      <Helmet title="Accueil | Dérangeons la Chambre" meta={meta}/>
      <div className={s.root}>
        <div className={s.backgroundHolder}>
          <div className={s.background}></div>
        </div>

        <div className={s.container}>
          <div className={s.logo}>
            <Logo style={{width:300, height: 'auto'}}/>
          </div>

          <h1 className={s.title}>Dérangeons la Chambre</h1>
          <h2 className={s.subtitle}>Assemblée Nationale&nbsp;: si on changeait les règles du jeu ?</h2>

          <Link to="/etude/introduction">
            <RaisedButton label="Dérangez la chambre"
              primary={true} style={{background:'none'}} overlayStyle={{ lineHeight: '30px'}}/>
          </Link>
        </div>


      </div>
    </Layout>
  );
}

Home.propTypes = {};

export default withStyles(s)(Home);
