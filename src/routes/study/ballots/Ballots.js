/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import SwipeableViews from 'react-swipeable-views';
import Markdown from 'react-remarkable';
import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// internal
import Ballot, {BallotPropType, PartiesPropTypes} from '../../../components/Ballot';
import Layout from '../../../components/Layout';
import BallotChart from '../../../components/BallotChart';
import s from './Ballots.css';
import { ViewPropTypes } from '../../../components/View';


const BallotsPropTypes = Object.assign({}, {
  activeBallot: PropTypes.string,
  ballots: PropTypes.arrayOf(PropTypes.shape(BallotPropType)),
  parties: PartiesPropTypes
}, ViewPropTypes);

class Ballots extends React.Component {
  static propTypes = BallotsPropTypes;

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  hasSwipeableViews(){ return true; }

  constructor(props, context, updater) {
    super(props, context, updater);

    let activeId  = this.props.activeBallot;
    const ballots = this.props.ballots;
    const activeBallot = ballots.find((b)=>b.id == activeId);
    const activeIndex  = ballots.indexOf(activeBallot);
    this.state = {
      index: activeIndex
    };
  }

  setIndex(index){
    this.setState({index:index});
  }

  atLastTab(){
    return this.state.index == this.props.ballots.length - 1;
  }

  atFirstTab(){
    return this.state.index == 0;
  }

  goNext(){
    const { index } = this.state;
    this.setState({
      index: index + 1
    });
  }

  goPrevious(){
    const { index } = this.state;
    this.setState({
      index: index - 1
    });
  }

  onNextClicked() {
    this.goNext();
  }

  onPreviousClicked() {
    this.goPrevious();
  }

  onChangeIndex(i){
    this.setState({index:i});
  }

  isActive(index){
    return this.state.index == index;
  }

  paginationItemClass(index){
    let classes = [ s.paginationItem ];
    if(this.isActive(index)){
      classes.push(s['paginationItem--active']);
    }
    return classes.join(' ');
  }

  currentBallotData(){
    const {index,} = this.state;
    const { ballots, parties } = this.props;
    return { results: ballots[index].results, parties };
  }

  render() {
    const {index,} = this.state;
    const {
      ballots, parties, isActive
    } = this.props;
    const ballot = this.currentBallotData();
    return (
      <div>
        <div className={s.pagination}>
          <div className={s.container}>
            {ballots.map((ballot, key) => {
              return <div key={key} className={ this.paginationItemClass(key) } onClick={ this.setIndex.bind(this, key) }>{key+1}</div>;
            })}
          </div>
        </div>
        <div className={s.container}>
          <BallotChart data={ ballot }/>
        </div>
        <SwipeableViews index={ index }
          onChangeIndex={ this.onChangeIndex.bind(this) }>
          {ballots.map((ballot, key) => {
            return (
              <Ballot {...ballot} key={key} isActive={this.isActive(key)} parties={parties}/>
            );
          })}
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(s)(Ballots);
