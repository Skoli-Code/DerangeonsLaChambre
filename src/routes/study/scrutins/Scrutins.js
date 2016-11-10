/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../../components/Layout';
import s from './Scrutins.css';
import { View, AbstractView, ViewPropTypes } from '../View';

class Scrutins extends React.Component {
  static propTypes = ViewPropTypes;
  render(){
    return (
      // we need to pass to holding View component includeHelmet property
      // took from ViewPropTypes
      <View includeHelmet={ this.props.includeHelmet }
        helmetProps={{ title: "Scrutins" }}>
        <div className={s.root}>
          <div className={s.container}>
            <h1 className={s.title}>Scrutins</h1>
            <p>Scrutins</p>
          </div>
        </div>
      </View>
    );
  }
}

export default withStyles(s)(Scrutins);
