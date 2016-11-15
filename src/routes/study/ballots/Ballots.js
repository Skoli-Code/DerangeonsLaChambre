/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import SwipeableViews from 'react-swipeable-views';
import bindKeyboard from 'react-swipeable-views/lib/bindKeyboard';
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Ballot, {BallotPropType, PartiesPropTypes} from '../../../components/Ballot';
import Layout from '../../../components/Layout';
import s from './Ballots.css';

import {View } from '../../../components/View';

const BallotsPropTypes = Object.assign({}, {
  activeBallot: PropTypes.string,
  ballots: PropTypes.arrayOf(PropTypes.shape(BallotPropType)),
  parties: PartiesPropTypes
});

class Ballots extends React.Component {
  static propTypes = BallotsPropTypes;

  constructor(props, context, updater) {
    super(props, context, updater);
    let activeIndex = 0;
    const ballots = this.props.ballots;
    const activeId = this.props.activeBallot;

    if (activeId) {
      activeIndex = ballots.indexOf(ballots.find((b) => {
        b.id == activeId
      }))
    }

    this.state = {
      index: activeIndex
    };
  }

  onNextClicked() {
    const {index} = this.state;
    this.setState({
      index: index + 1
    });
  }

  onPreviousClicked() {
    const {index} = this.state;
    this.setState({
      index: index - 1
    });
  }

  render() {
    const {index} = this.state;
    const ballots = this.props.ballots || [];
    const parties = this.props.parties;
    return (
      <div>
        <div className={s.pagination}>
          {ballots.map((ballot, key) => {
            return <div className={s.paginationItem}>{key}</div>;
          })}
        </div>
        <BindKeyboardSwipeableViews>
          {ballots.map((ballot, key) => {
            return <Ballot {...ballot} includeHelmet={key == index} parties={parties}/>;
          })}
        </BindKeyboardSwipeableViews>
      </div>
    );
  }
}

export default withStyles(s)(Ballots);
