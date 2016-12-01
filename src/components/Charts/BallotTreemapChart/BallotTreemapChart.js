// inspired from https://github.com/kauffecup/react-bubble-chart/
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as d3 from 'd3';
import * as _ from 'lodash';

import s from './BallotTreemapChart.css';
import { ChartPropTypes } from '../PropTypes';
import ChartConfig from '../config';

class D3BallotTreemapChart {
  config = Object.assign({}, ChartConfig, {
  });
  constructor(el, props) {
    this.$chart = d3.select(el);
    this.initChart();
    this.updateSize();
    this.updateData(props.data);
    this.draw();
    this.bindEvents();
  }

  initChart(){
    this.treemap = d3.treemap().padding(1).round(true);
  }

  updateData(data) {
    this.results = data.results.sort((a, b) => b.seats - a.seats);
  }

  updateSize() {
    // width = parent node width.
    // height = height of the golden ratio rectangle
    let width = this.$chart.node().parentNode.getBoundingClientRect().width;
    if(isNaN(width) || !width){
      width = 480;
    }
    const height = width*0.618033989;
    //
    // this.size = {
    //   width: width,
    //   height: height
    // }
    this.treemap = this.treemap.size([width, height])
  }

  update(el, props) {
    this.$chart = d3.select(el);
    this.updateData(props.data);
    this.updateSize();
    this.draw();
  }

  bindEvents() {
  }

  draw() {
    this.$chart.selectAll('.party')
  }
}

export class BallotTreemapChart extends React.Component {
  static propTypes = ChartPropTypes;

  constructor(props) {
    super(props);
    // define the method this way so that we have a clear reference to it
    // this is necessary so that window.removeEventListener will work properly
    this.handleResize = (e => this._handleResize(e));
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.ballotTreemapChart = new D3BallotTreemapChart(this.node(), this.chartState());
  }

  chartState() {
    return {data: this.props.data, onPartyHover: this.props.onPartyHover};
  }

  componentDidUpdate() {
    this.ballotTreemapChart.update(this.node(), this.chartState());
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
      this.ballotTreemapChart.update(this.node(), this.chartState());
      delete this.__resizeTimeout;
    }, 200);
  }
}

export default withStyles(s)(BallotTreemapChart);
