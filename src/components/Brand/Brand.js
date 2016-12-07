import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '../Link';
import {Logo} from '../Pictos';
import s from './Brand.css';

class Brand extends React.Component {
  shouldComponentUpdate(){ return false; }
  render(){
    return (
      <Link className={s.brand} to="/">
      <Logo useWhite={true} style={{height: 63, width: 63}}/>
      </Link>
    );
  }
}

export default withStyles(s)(Brand);
