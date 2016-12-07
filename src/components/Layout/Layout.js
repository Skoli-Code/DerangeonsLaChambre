/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import theme from '../theme';
import Footer from '../Footer';
import SocialConfig from '../Socials/Config';

function Layout({ children }) {
  return (
    <MuiThemeProvider muiTheme={theme}>
      <div>
        <Helmet {...SocialConfig.helmet }/>
        {children}
      </div>
    </MuiThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(s)(Layout);
