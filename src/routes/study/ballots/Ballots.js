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
import AssemblyChart from '../../../components/AssemblyChart';
import s from './Ballots.css';
import { ViewPropTypes } from '../../../components/View';
import * as _ from 'lodash';
import * as d3 from 'd3';

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
    // console.log('goNext');
    const { index } = this.state;
    this.setState({
      index: index + 1
    });
  }

  goPrevious(){
    // console.log('goPrevious');
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
    // console.log('onChangeIndex !');
    if(i != this.state.index){
      this.setState({index:i});
    }
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
    const results  = this.props.ballots[index].results.slice(0);
    const parties  = this.props.parties.slice(0);
    return { results, parties };
  }

  render() {
    const {index,} = this.state;
    const {
      ballots, parties, isActive
    } = this.props;
    const ballotData = this.currentBallotData();
    const currentBallot = ballots[index];
    const results = _.cloneDeep(ballotData.results);
    const firstResult = results.sort((a, b)=>b.seats - a.seats)[0];
    const firstParty = parties.find((p)=> p.id == firstResult.party);
    const allocatedSeats = d3.sum(results, (r)=>r.seats);
    const totalSeats = 577;
    const absoluteMajority = firstResult.seats > Math.ceil(totalSeats/2);
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
          <h1>{ currentBallot.title }</h1>
          <h2 className={s.subtitle }>{ currentBallot.subtitle }</h2>
          <div className={s.content}>
            <div className={s['content--left']}>
              <BallotChart data={ _.cloneDeep(ballotData) }/>
            </div>
            <div className={s['content--right']}>
              <AssemblyChart data={ _.cloneDeep(ballotData) }/>
              <div className={s.legend}>
                <div>
                  <label>Majorité { absoluteMajority ? '(absolue)' : ''}</label><span>{ firstParty.name }</span>
                </div>
                <div>
                  <label>Sièges attibués</label><span>{ allocatedSeats }/{ totalSeats }</span>
                </div>
                <div>
                  <label>Mode de scrutin</label>
                  <p>{ currentBallot.legend_title }</p>
                </div>
                <div className={s.sep}/>
              </div>
            </div>
          </div>
        </div>
        <SwipeableViews index={ index }
          onChangeIndex={ this.onChangeIndex.bind(this) }>
          {ballots.map((ballot, key) => {
            return (
              <div key={key} className={s.container}>
                <Ballot {...ballot} isActive={this.isActive(key)} parties={parties}/>
              </div>
            );
          })}
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(s)(Ballots);
