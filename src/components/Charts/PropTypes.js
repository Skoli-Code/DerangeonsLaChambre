import React, { PropTypes } from 'react';

export const PartyPropTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired
}

export const PartiesPropTypes = PropTypes.arrayOf(PropTypes.shape(PartyPropTypes));

export const ResultsPropTypes = PropTypes.arrayOf(PropTypes.shape({
  party: PropTypes.string.isRequired,
  seats: PropTypes.number.isRequired
}));

export const BallotPropTypes = {
  id: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  results: ResultsPropTypes
};

export const ChartPropTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({parties: PartiesPropTypes, results: ResultsPropTypes})
}

export default BallotPropTypes;
