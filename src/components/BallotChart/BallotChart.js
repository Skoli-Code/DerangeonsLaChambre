// inspired from https://github.com/kauffecup/react-bubble-chart/
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as d3 from 'd3';
import * as _ from 'lodash';

import Layout from '../Layout';
import s from './BallotChart.css';

import {ResultsPropTypes, PartiesPropTypes} from '../Ballot';
export const BallotChartPropTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({parties: PartiesPropTypes, results: ResultsPropTypes})
}
let identity = (i) => i;
export const objectStyle = (sel, styles) => {
  for (const k in styles) {
    sel.style(k, styles[k]);
  }
  return sel;
}

let px = (n) => n + 'px';

class D3BallotChart {
  config = {
    squareOpacity: 0.5,
    squareOpacityMax:1,
    rows: 15,
    tooltip:{
      width: 200,
      height: 75
    }
  };
  constructor(el, props) {
    this.$chart = d3.select(el);
    this.$holder = d3.select(el.parentNode);
    this.initChart();
    this.initTooltip();
    this.updateData(props.data);
    this.updateSize();
    this.draw();
    this.bindEvents();
  }

  initChart() {
    const chartStyle = {
      position: 'relative'
    }
    objectStyle(this.$chart, chartStyle);
  }
  initTooltip() {
    const size = this.config.tooltip;
    const tooltipStyle = {
      'z-index': 100,
      'pointer-events': 'none',
      position: 'absolute',
      'text-align': 'center',
      'vertical-align': 'center',
      opacity: 0,
      width:  px(size.width),
      height: px(size.height),
      background: 'rgba(255,255,255,0.6)'
    }
    this.$tooltip = this.$chart.append('div').attr('class', 'tooltip');
    objectStyle(this.$tooltip, tooltipStyle);
    this.$tooltipContent = this.$tooltip.append('div').attr('class', 'tooltip__content');
    objectStyle(this.$tooltipContent, {
      position: 'absolute',
      top: '50%',
      transform: 'translate(0, -50%)',
      width: px(size.width),
    });
  }

  updateData(data) {
    this.results = data.results.sort((a, b) => b.seats - a.seats);
    this.parties = data.parties;
    this.squares = [];

    for (const i in this.results) {
      const ballot = this.results[i];
      const party = this.parties.find((d)=>d.id == ballot.party);
      const squares = d3.range(ballot.seats).map((i) =>{ return Object.assign({ seats: ballot.seats }, party) });
      this.squares = this.squares.concat(squares);
    }
  }

  updateSize() {
    const elStyle = window.getComputedStyle(this.$holder.node());
    const innerWidth = +elStyle.width.slice(0, -2);
    if(isNaN(innerWidth)){
      debugger;
    }
    console.log('innerWidth', innerWidth);
    const w = Math.floor(innerWidth);
    const nbRows = this.config.rows;
    const nbColumns = Math.ceil(577 / nbRows);
    const squareMargin = 2;
    const squareWidth = w / nbColumns;
    let h = nbRows * squareWidth;

    const squareSize = {
      width:  Math.floor(squareWidth),
      height: Math.floor(squareWidth),
      margin: squareMargin
    };

    this.size = {
      padding: 2,
      square: squareSize,
      width: w,
      height: h
    }

    objectStyle(this.$chart, {
      width: px(this.size.width),
      height: px(this.size.height)
    });
  }

  update(el, props) {
    this.$chart = d3.select(el);
    this.$holder = d3.select(el.parentNode)
    this.updateData(props.data);
    this.updateSize();
    this.draw();
  }

  bindEvents() {
    const $tooltip = this.$tooltip;
    const $tooltipContent = this.$tooltipContent;
    const results = this.results;
    const parties = this.parties;
    const chartSize = this.size;
    const config = this.config.tooltip;
    this.$chart.selectAll('.square')
      .on('mouseover', (party) => {
        const partyName = party.name;
        const seats     = party.seats;
        const text      = `${partyName}<br/><b>${seats}`;
        $tooltipContent.html(text);
        $tooltip.style('opacity', 1);
        this.$chart.selectAll('.square.' + party.id).style('opacity', this.config.squareOpacityMax);
      }).on('mouseleave', () => {
        this.$chart.selectAll('.square').style('opacity', this.config.squareOpacity);
      });

    this.$chart.on('mousemove', function(d){
      let x = d3.mouse(this)[0] - config.width;
      let y = d3.mouse(this)[1] - config.height;
      x = x < 0 ? 0 : x;
      y = y < 0 ? 0 : y;
      $tooltip.style("left", px(x)).style('top', px(y));
    }).on('mouseleave', () => {
      $tooltip.style('opacity', 0);
    });
  }

  draw() {
    const size = this.size.square;
    // process:
    // for each party, draw every square based on the latest square drawn
    let $squares = this.$chart.selectAll('.square').data(this.squares);

    $squares.attr('class', (d) => `square ${d.id}`).each(function(d){
      d3.select(this).select('.inner').style('background-color', d.color);
    });

    let style = (squares) => {
      objectStyle(squares, {
        width: px(size.width),
        height: px(size.height),
        position: 'absolute',
        opacity: this.config.squareOpacity,
        transition: 'opacity 350ms ease-out'
      });
      squares.style('top', (d, i) => {
        const top = (i % this.config.rows) * size.height;
        return px(top);
      })
      squares.style('left', (d, i) => {
        const left = Math.floor(i / this.config.rows) * size.width;
        return px(left);
      });
    }

    let $squareEnter = $squares.enter().append('div').attr('class', (d) => `square ${d.id}`);

    const $innerSquares = $squareEnter.append('div').attr('class', 'inner');
    let pad = px(1);

    objectStyle($innerSquares, {
      'border-radius': px(2),
      position: 'absolute',
      top: pad,
      left: pad,
      right: pad,
      bottom: pad,
      transition: 'background-color 350ms ease-out',
      'background-color': (d)=>d.color
    });

    style($squareEnter);
    style($squares);

    $squares.exit().style('opacity', 0).remove();
  }
}

export class BallotChart extends React.Component {
  static propTypes = BallotChartPropTypes;

  constructor(props) {
    super(props);
    // define the method this way so that we have a clear reference to it
    // this is necessary so that window.removeEventListener will work properly
    this.handleResize = (e => this._handleResize(e));
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.ballotChart = new D3BallotChart(this.node(), this.chartState());
  }

  chartState() {
    return {data: Object.assign({}, this.props.data)};
  }

  componentDidUpdate() {
    // console.log('BallotChart.componentDidUpdate', this.props.data);
    this.ballotChart.update(this.node(), this.chartState());
  }

  render() {
    return (
      <div className={s.chart}></div>
    );
  }

  /** Helper method to reference this dom node */
  node() {
    return ReactDOM.findDOMNode(this);
  }

  _handleResize(e) {
    this.__resizeTimeout && clearTimeout(this.__resizeTimeout);
    this.__resizeTimeout = setTimeout(() => {
      this.ballotChart.update(this.node(), this.chartState());
      delete this.__resizeTimeout;
    }, 200);
  }
}

export default withStyles(s)(BallotChart);