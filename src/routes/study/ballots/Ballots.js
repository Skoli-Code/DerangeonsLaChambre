/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import SwipeableViews from 'react-swipeable-views';
import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Checkbox from 'rc-checkbox';
import Sticky from 'react-stickynode';
// import Portal from 'react-portal';

// internal
import {BallotPropType, PartiesPropTypes} from '../../../components/Charts';
import Markdown from '../../../components/Markdown';
import Layout from '../../../components/Layout';
import { BallotChart, BallotTreemapChart, AssemblyChart } from '../../../components/Charts';
import s from './Ballots.css';
import { ViewPropTypes } from '../../../components/View';
import * as _ from 'lodash';
import * as d3 from 'd3';

const BallotsPropTypes = Object.assign({}, {
  onChangeIndex:PropTypes.function,
  activeIndex: PropTypes.number,
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
    this.state = {
      index: props.activeIndex || 0,
      compareToActualResults: false
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
    if(i != this.state.index){
      this.setState({index:i});
    }
    if(this.props.onChangeIndex){
      this.props.onChangeIndex(i);
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

  onPartyHover(party){
    this.assemblyChart.hoverParty(party);
  }

  onCheckboxToggle(e){
    const { index } = this.state;
    const checked = !e.target.checked;
    this.setState({index: index, compareToActualResults:checked});
  }

  pagination(ballots){
    return (
      <div className={s.pagination} top={62} isActive={true}>
        <div className={s.container}>
        {ballots.map((ballot, key) => {
          return <div key={key} className={ this.paginationItemClass(key) } onClick={ this.setIndex.bind(this, key) }>{key+1}</div>;
        })}
        </div>
      </div>
    );
  }

  legend(ballot){
    const {index, compareToActualResults} = this.state;
    const {ballots, parties} = this.props;

    if(!ballot){
      ballot = ballots[index];
    }
    const results = _.cloneDeep(ballot.results);
    const firstResult = results.sort((a, b)=>b.seats - a.seats)[0];
    const allocatedSeats = d3.sum(results, (r)=>r.seats);
    const totalSeats = 577;
    const absoluteMajority = firstResult.seats > Math.ceil(totalSeats/2);

    return (
      <div className={s.legend}>
        <div>
          <label>Majorité { absoluteMajority ? '(absolue)' : ''}</label>
          <span>{ firstResult.party.name }</span>
        </div>
        <div>
          <label>Sièges attibués</label>
          <span>{ allocatedSeats }/{ totalSeats }</span>
        </div>
        <div>
          <label>Mode de scrutin</label>
          <p>{ ballot.legend_title }</p>
        </div>
        { index > 0 && (
          <div>
            <div className={s.sep}/>
            <label>
              <Checkbox checked={compareToActualResults}
              onChange={ this.onCheckboxToggle.bind(this) }/>
              Comparer avec l'assemblée actuelle
            </label>
          </div>
        )}
      </div>
    );
  }

  render() {
    const {index, compareToActualResults} = this.state;
    const {
      ballots, parties, isActive
    } = this.props;
    let currentBallot = ballots[index];
    if(compareToActualResults){
      currentBallot = ballots[0];
    }
    const ballotData = { results: currentBallot.results, parties: parties };

    return (
      <div>
        <Sticky>{ this.pagination(ballots) }</Sticky>
        <div className={s.container}>
          <div className={s['hidden-touch']}>
            <h1>{ currentBallot.title }</h1>
            <h3 className={s.subtitle }>{ currentBallot.subtitle }</h3>
          </div>

          <div className={s.content+' '+s['hidden-touch']}>
            <div className={s['content--left']}>
              <BallotChart data={ _.cloneDeep(ballotData) } onPartyHover={ (party)=>this.onPartyHover(party) }/>
            </div>
            <div className={s['content--right']}>
              <div>
                <AssemblyChart data={ _.cloneDeep(ballotData) } onRef={ (ref)=> this.assemblyChart = ref }/>
                { this.legend(null) }
              </div>
            </div>
          </div>
        </div>
        <SwipeableViews index={ index }
          onChangeIndex={ this.onChangeIndex.bind(this) }>
          {ballots.map((ballot, key) => {
            const chartData = {
                results: (compareToActualResults ? currentBallot : ballot).results,
                parties: parties
            };
            return (
              <div key={key} className={s.container + ' ' + s.content}>
                <div className={s['content--left']}>
                  <div className={s['visible-touch']}>
                    <h1>{ ballot.title }</h1>
                    <h3 className={s.subtitle }>{ ballot.subtitle }</h3>
                    <BallotTreemapChart data={ _.cloneDeep(chartData) }/>
                    <AssemblyChart data={ _.cloneDeep(chartData) }/>
                    { this.legend(ballot) }
                  </div>
                  <Markdown content={ ballot.content }/>
                </div>
              </div>
            );
          })}
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(s)(Ballots);
