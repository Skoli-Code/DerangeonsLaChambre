import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Ballot.css';
import Layout from '../Layout';

import Markdown from '../Markdown';

export const PartyPropTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  order: PropTypes
}

export const PartiesPropTypes = PropTypes.arrayOf(PropTypes.shape(PartyPropTypes))
export const ResultsPropTypes = PropTypes.arrayOf(PropTypes.shape({
  party: PropTypes.string.isRequired,
  seats: PropTypes.number.isRequired
}));

export const BallotPropTypes = {
  id: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  results: ResultsPropTypes
}

class Ballot extends React.Component {
  static propTypes = Object.assign({}, {parties: PartiesPropTypes}, BallotPropTypes);
  render(){
    return (<Layout>
      <div className={s.ballot}>
        <Markdown content={ this.props.content }/>
      </div>
    </Layout>);
  }
}

export default withStyles(s)(Ballot);
