import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as d3 from 'd3';

import s from './AssemblyChart.css';
import { BallotChartPropTypes, objectStyle } from '../BallotChart';

class D3AssemblyChart {
  constructor(el, props){
    this.$chart = d3.select(el);
    this.initChart();
    this.updateData(props.data);
  }

  initChart(){
  }

  updateData(data){
    this.parties = data.parties;
    this.results = data.results.map((r)=>{
      r.order = this.parties.find((p)=>p.id == r.party).order
    });
    this.results = this.results.sort((a,b)=>b.order - a.order);
  }

  update(el, props){
    this.$chart = d3.select(el);
    this.updateData(props.data);
  }
}

export class AssemblyChart extends React.Component {
  static propTypes = BallotChartPropTypes;

  constructor(props) {
    super(props);
    // define the method this way so that we have a clear reference to it
    // this is necessary so that window.removeEventListener will work properly
    this.handleResize = (e => this._handleResize(e));
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.assemblyChart = new D3AssemblyChart(this.node(), this.chartState());
  }

  chartState() {
    return {data: this.props.data};
  }

  componentDidUpdate() {
    this.assemblyChart.update(this.node(), this.chartState());
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
      this.assemblyChart.update(this.node(), this.chartState());
      delete this.__resizeTimeout;
    }, 200);
  }
}

export default withStyles(s)(AssemblyChart);
