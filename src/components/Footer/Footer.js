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
import Legals from '../Legals';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Footer extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    return this.state.legalsOpened != nextState.legalsOpened;
  }

  constructor(){
    super();
    this.state = { legalsOpened: false };
  }
  openLegals(e){
    e.preventDefault();
    this.setState({legalsOpened:true});
  }

  closeLegals(){
    this.setState({legalsOpened:false});
  }

  render(){
    const actions = [
      <FlatButton label="Fermer" primary={true}
        onClick={this.closeLegals.bind(this)}
        onTouchTap={this.closeLegals.bind(this)}/>,
    ];
    return (
      <div className={s.root}>
        <Dialog
          title="Mentions légales"
          open={this.state.legalsOpened}
          actions={actions}
          autoScrollBodyContent={true}
          onRequestClose={this.closeLegals.bind(this)}>
          <Legals/>
        </Dialog>
        <div className={s.container}>
          <span className={s.text}>© <Link className={s.link} to="http://skoli.fr" rel="nofollow" target="_blank" label="Skoli"/></span>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/">Accueil</Link>
          <span className={s.spacer}>·</span>
          <Link onClick={this.openLegals.bind(this)} className={s.link} to="/">Mentions Légales</Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
