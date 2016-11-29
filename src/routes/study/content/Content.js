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
import Layout from '../../../components/Layout';
import Markdown from '../../../components/Markdown';
import s from './Content.css';
import { View, ViewPropTypes } from '../../../components/View';

class Content extends React.Component {
  static propTypes = Object.assign({}, {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
  }, ViewPropTypes);

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  hasSwipeableViews(){ return false; }


  render(){
    return (
      <Layout>
        <Helmet title={this.props.title} />
        <div className={s.root}>
          <div className={s.container}>
            <Markdown content={ this.props.content }/>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withStyles(s)(Content);
