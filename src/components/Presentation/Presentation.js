import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Presentation.css';
import Layout from '../Layout';

class Presentation extends React.Component {
  render(){
    return (<Layout>
      <div className={s.presentation}>
      </div>
    </Layout>);
  }
}

export default withStyles(s)(Presentation);
