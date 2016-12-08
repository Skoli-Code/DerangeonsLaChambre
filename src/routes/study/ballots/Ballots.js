import SwipeableViews from 'react-swipeable-views';
import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Checkbox from 'rc-checkbox';
import FontIcon from 'material-ui/FontIcon';
import Portal from 'react-portal';
import Markdown from 'react-markdown';

// internal
import {extendMeta} from '../../../components/Socials/Config';

import {BallotPropTypes, PartyPropTypes} from '../../../components/Charts';
// import Markdown from '../../../components/Markdown';
// import Layout from '../../../components/Layout';
import { BallotChart, BallotTreemapChart, AssemblyChart } from '../../../components/Charts';
import s from './Ballots.css';
import * as _ from 'lodash';
import * as d3 from 'd3';

const BallotsPropTypes = Object.assign({}, {
  onRef: PropTypes.function,
  onBallotChange:PropTypes.function,
  activeBallot: PropTypes.number,
  ballots: PropTypes.arrayOf(PropTypes.shape(BallotPropTypes)),
  parties: PropTypes.arrayOf(PropTypes.shape(PartyPropTypes))
});

class Ballots extends React.Component {
  static propTypes = BallotsPropTypes;

  componentDidMount() {
    if(this.props.onRef){
       this.props.onRef(this);
    }
  }
  componentWillUnmount() {
    if(this.props.onRef){
       this.props.onRef(undefined);
    }
  }

  // shouldComponentUpdate(nextProps){
  //   return nextProps.activeBallot != this.state.index;
  // }

  hasSwipeableViews(){ return true; }

  constructor(props, context, updater) {
    super(props, context, updater);
    this.state = {
      index: props.activeBallot || 0,
      compareToActualResults: false
    };
  }

  setIndex(i){
    this.setState({index:i});
    if(this.props.onBallotChange){
      this.props.onBallotChange(i);
    }
  }

  atLastTab(){
    return this.state.index == this.props.ballots.length - 1;
  }

  atFirstTab(){
    return this.state.index == 0;
  }

  goNext(){
    const { index } = this.state;
    const i = index + 1;
    this.setState({
      index: i
    });
    if(this.props.onBallotChange){
      this.props.onBallotChange(i);
    }
  }

  goPrevious(){
    const { index } = this.state;
    const i =  index - 1;
    this.setState({
      index: i
    });
    if(this.props.onBallotChange){
      this.props.onBallotChange(i);
    }
  }

  onNextClicked() {
    this.goNext();
  }

  onPreviousClicked() {
    this.goPrevious();
  }

  onChangeIndex(i){

    if(i != this.state.index){
      this.setState({index:i, compareToActualResults: false});
    }
    if(this.props.onBallotChange){
      this.props.onBallotChange(i);
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
    this.setState({compareToActualResults:checked});
  }

  pagination(ballots){
    return (
      <div className={s.pagination}>
        <div className={s.container}>
        { !this.atFirstTab() && <div className={s.previousArrow+' '+s['visible-touch']} onClick={ this.onPreviousClicked.bind(this) }>
            <FontIcon style={{height:20, width: 20, fontSize:20}} className="material-icons">chevron_left</FontIcon>
          </div>
        }
        {ballots.map((ballot, key) => {
          return <div key={key} className={ this.paginationItemClass(key) } onClick={ this.setIndex.bind(this, key) }></div>;
        })}
        { !this.atLastTab() && <div className={s.nextArrow+' '+s['visible-touch']} onClick={ this.onNextClicked.bind(this) }>
            <FontIcon style={{height:20, width: 20, fontSize:20}} className="material-icons">chevron_right</FontIcon>
          </div>
        }
        </div>
      </div>
    );
  }

  showBallot(i){
    const {
      index
    } = this.state;
    return i == index || i == (index - 1) || i == (index + 1);
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
              Assemblée actuelle
            </label>
          </div>
        )}
      </div>
    );
  }

  arrowNavigation(){
    return (
      <Portal isOpened={this.props.isActive}>
      <div className={s.arrowNavigation}>
        { !this.atFirstTab() &&
          <div className={s.previousArrow} onClick={ this.onPreviousClicked.bind(this) }>
          <FontIcon className="material-icons">chevron_left</FontIcon>
          </div>
        }
        { !this.atLastTab() &&
        <div className={s.nextArrow} onClick={ this.onNextClicked.bind(this) }>
          <FontIcon className="material-icons">chevron_right</FontIcon>
        </div>
        }
      </div>
      </Portal>
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

    const ballotData = { ballot: currentBallot, parties: parties };
    return (
      <div>
        { this.props.isActive &&
          <Helmet title={ballots[index].title} meta={ballots[index].meta}/>
        }
        { this.pagination(ballots) }
        <div className={s.container}>
          <div className={s['hidden-touch']}>
            <h1>{ currentBallot.title }</h1>
            <h3 className={s.subtitle }>{ currentBallot.subtitle }</h3>
          </div>

          <div className={s.content+' '+s['hidden-touch']}>
            { this.arrowNavigation() }
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
        <SwipeableViews
          index={ index }
          onChangeIndex={ this.onChangeIndex.bind(this) }>
          {ballots.map((ballot, key) => {
            if(!this.showBallot(key)){
              return;
            } else {
              const chartData = {
                ballot: (compareToActualResults ? currentBallot : ballot),
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
                  <Markdown source={ ballot.content }/>
                </div>
              </div>
            );
            }
          })}
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(s)(Ballots);
