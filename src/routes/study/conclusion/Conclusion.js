/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Conclusion.css';
import { ViewPropTypes, View } from '../../../components/View';

class Conclusion extends React.Component {
  static propTypes = ViewPropTypes;

  render(){
    const props = { title: 'Conclusion' };

    return (
      // we need to pass to holding View component includeHelmet property
      // took from ViewPropTypes
      <View includeHelmet={this.props.includeHelmet} helmetProps={ props }>
        <div className={s.root}>
          <div className={s.container}>
            <h1 className={s.title}>Conclusion</h1>
            <p>Conclusion</p>
          </div>
        </div>
      </View>
    );
  }
}
export default withStyles(s)(Conclusion);
