// inspired from https://github.com/kauffecup/react-bubble-chart/
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as d3 from 'd3';

import Layout from '../Layout';
import s from './BallotChart.css';

import {ResultsPropTypes, PartiesPropTypes} from '../Ballot';
export const BallotChartPropTypes = {
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
    squareOpacity: 0.33,
    rows: 20,
    tooltip:{
      width: 120,
      height: 50
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
    const tooltipStyle = {
      'z-index': 100,
      'pointer-events': 'none',
      position: 'absolute',
      'text-align': 'center',
      width:  px(this.config.tooltip.width),
      height: px(this.config.tooltip.height),
      background: 'rgba(255,255,255,0.6)'
    }
    this.$tooltip = this.$chart.append('div').attr('class', 'tooltip');
    objectStyle(this.$tooltip, tooltipStyle);
  }

  updateData(data) {
    this.results = data.results.sort((a, b) => b.seats - a.seats);
    this.squares = [];
    for (const i in this.results) {
      const ballot = this.results[i];
      const r = d3.range(ballot.seats);
      const squares = r.map((i) => ballot.party);
      this.squares = this.squares.concat(squares);
    }
    this.parties = data.parties;
  }

  updateSize() {
    const w = Math.floor(this.$chart.node().parentNode.getBoundingClientRect().width);
    const nbRows = this.config.rows;
    const nbColumns = Math.round(577 / nbRows);
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
    const results = this.results;
    const parties = this.parties;
    const config = this.config.tooltip;
    this.$chart.selectAll('.square')
      .on('mouseover', (party) => {
        const partyName = parties.find((p)=>p.id == party).name;
        const seats     = results.find((r)=>r.party == party).seats;
        const text      = `${partyName}<br/><b>${seats}`;
        $tooltip.html(text);
        $tooltip.style('opacity', 1);
        this.$chart.selectAll('.square.' + party).style('opacity', 0.8);
      }).on('mouseleave', () => {
        this.$chart.selectAll('.square').style('opacity', this.config.squareOpacity);
      });

    this.$chart.on('mousemove', function(d){
      const xPosition = d3.mouse(this)[0] - config.width;
      const yPosition = d3.mouse(this)[1] - config.height;
      $tooltip.style("left", px(xPosition)).style('top', px(yPosition));
    }).on('mouseleave', () => {
      $tooltip.style('opacity', 0);
    });
  }

  draw() {
    const size = this.size.square;
    let bgColor = (d) => this.parties.find((p) => p.id == d).color;

    // process:
    // for each party, draw every square based on the latest square drawn
    let $squares = this.$chart.selectAll('.square').data(this.squares);

    $squares.attr('class', (d) => `square ${d}`).each(function(d){
      d3.select(this).select('.inner').style('background-color', bgColor(d));
    });
    // $squares.selectAll('.inner').style('background-color', bgColor);

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

    let $squareEnter = $squares.enter().append('div').attr('class', (d) => `square ${d}`);

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
      'background-color': bgColor
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
    return {data: this.props.data};
  }

  componentDidUpdate() {
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
