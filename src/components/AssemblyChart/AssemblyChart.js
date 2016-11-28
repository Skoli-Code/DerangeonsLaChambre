import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as d3 from 'd3';
import * as _ from 'lodash';

import s from './AssemblyChart.css';
import { BallotChartPropTypes, objectStyle } from '../BallotChart';
const pi = Math.PI;

class D3AssemblyChart {
  constructor(el, props){
    this.$chart = d3.select(el);
    this.initChart();
    this.updateSize();
    this.updateData(props.data);
    this.draw();
  }

  initChart(){
    this.$svg = this.$chart.append('svg');
    this.$g = this.$svg.append('g');
  }

  updateSize(){
    const width = this.$chart.node().parentNode.getBoundingClientRect().width;
    const height = width / 2;
    this.$svg.attr('width', width).attr('height', height);
    this.$g.attr('transform', `translate(${width / 2}, ${height})`)
    this.size = {
      radius: width / 2
    }

  }
  updateData(data){
    this.parties = data.parties;
    this.results = data.results.map((r)=>{
      r.party = this.parties.find((p)=>p.id == r.party);
      return r;
    });

    this.pie = d3.pie()
      .value((d)=>d.seats)
      .sort((a,b)=>a.party.order - b.party.order)
      .startAngle(-90*(pi/180))
      .endAngle(90*(pi/180));

    this.arc = d3.arc().outerRadius(this.size.radius).innerRadius(0);
    // console.log(this.results, this.pie);
  }

  update(el, props){
    this.$chart = d3.select(el);
    this.updateData(props.data);
    this.updateSize();
    this.draw();
  }

  draw(){
    let drawArcs = (p)=>{
      p.transition().duration(350)
        .style('opacity', 1)
        .attr('d', this.arc)
        .attr('fill', (d)=>d.data.party.color);
      return p;
    }
    const pieData = this.pie(this.results);
    const parties = this.$g.selectAll('.party').data(pieData);
    const partiesEnter = parties.enter().append('g').attr('class', (d)=> 'party '+d.data.party.id);
    const partiesEnterPath = partiesEnter.append('path').style('opacity',0);

    parties.each(function(){
      drawArcs(d3.select(this).select('path'));
    });
    drawArcs(partiesEnterPath);
    parties.exit().transition().duration(100).style('opacity',0).remove();
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
