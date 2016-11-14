import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Ballot.css';

export const PartyPropTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export const PartiesPropTypes = PropTypes.arrayOf(PropTypes.shape(PartyPropTypes))

export const BallotPropTypes = {
  parties: PartiesPropTypes,
  id: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    party: PropTypes.string.isRequired,
    result: PropTypes.number.isRequired
  }))
}

class Ballot extends React.Component {
  static propTypes = BallotPropTypes;
  render(){
    return (<div>{this.props.id}</div>);
  }
}

export default withStyles(s)(Ballot);
