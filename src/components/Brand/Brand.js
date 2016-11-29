import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '../Link';
import s from './Brand.css';

function Brand(){
  return (
    <Link className={s.brand} to="http://skoli.fr" rel="nofollow" target="_blank">Skoli</Link>
  )
}

export default withStyles(s)(Brand);
