import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as d3 from 'd3';
import * as _ from 'lodash';

import s from './AssemblyChart.css';
import { BallotChartPropTypes, objectStyle } from '../BallotChart';
const pi = Math.PI;

class D3AssemblyChart {
  config = {
    opacityMin: 0.1,
    opacityMax: 1
  }
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
    let width = this.$chart.node().parentNode.getBoundingClientRect().width;
    console.log('AssemblyChart.updateSize', width);
    if(isNaN(width) || width == 0 || width == null || width > 300){
      width = 300;
    }
    const height = width / 2;
    this.$svg.attr('width', width).attr('height', height);
    this.$g.attr('transform', `translate(${width / 2}, ${height})`)
    this.size = {
      radius: width / 2
    }
  }

  hoverParty(party){
    if(party != null){
      this.$g.selectAll('path').style('opacity', this.config.opacityMin);
      this.$g.select('path.'+party.id).style('opacity', this.config.opacityMax);
    } else {
      this.$g.selectAll('path').style('opacity', this.config.opacityMax);

    }
  }

  updateData(data){
    console.log(data);
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
  }

  update(el, props){
    this.$chart = d3.select(el);
    this.updateSize();
    this.updateData(props.data);
    this.draw();
  }

  draw(){
    let partyColor = (d)=>{
      const color = d.data.party.color || 'white';
      return color == 'random'?'#feec29': color;
    };

    const self = this;
    const key = (d)=>d.data.party.id;

    // took from http://bl.ocks.org/mbostock/5682158
    function findNeighborArc(i, data0, data1, key) {
      var d;
      return (d = findPreceding(i, data0, data1, key)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
          : (d = findFollowing(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
          : null;
    }

    // Find the element in data0 that joins the highest preceding element in data1.
    function findPreceding(i, data0, data1, key) {
      var m = data0.length;
      while (--i >= 0) {
        var k = key(data1[i]);
        for (var j = 0; j < m; ++j) {
          if (key(data0[j]) === k) return data0[j];
        }
      }
    }

    // Find the element in data0 that joins the lowest following element in data1.
    function findFollowing(i, data0, data1, key) {
      var n = data1.length, m = data0.length;
      while (++i < n) {
        var k = key(data1[i]);
        for (var j = 0; j < m; ++j) {
          if (key(data0[j]) === k) return data0[j];
        }
      }
    }

    function arcTween(d) {
      var i = d3.interpolate(this._current, d);
      this._current = i(0);
      return function(t) { return self.arc(i(t)); };
    }


    const data0 = this.$g.selectAll('.party').data();
    const data1 = this.pie(this.results);

    const parties = this.$g.selectAll('.party').data(data1, key);

    const partiesEnter = parties.enter()
      .append('path').attr('class', (d)=> 'party '+d.data.party.id)
      .style('transition', 'opacity 350ms ease')
      .style('opacity', this.config.opacityMax)
      .attr('fill', (d)=>partyColor(d))
      .attr('stroke-width', (d)=>d.data.party.color ? '0': '1px')
      .attr('stroke', (d)=>d.data.party.color ? '0':'#d3d3d3')
      .attr('d', this.arc);


    partiesEnter.each(function(d, i) {
      this._current = findNeighborArc(i, data0, data1, key) || d;
    });

    parties.transition().duration(350).attrTween('d', arcTween);

    // drawArcs(partiesEnterPath);

    parties.exit()
        .datum(function(d, i) { return findNeighborArc(i, data1, data0, key) || d; })
      .transition()
        .duration(750)
        .attrTween("d", arcTween)
        .remove();
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
    if(this.props.onRef){
      this.props.onRef(this);
    }
  }

  componentWillUnmount() {
    if(this.props.onRef){
      this.props.onRef(undefined)
    }
  }

  hoverParty(party){
    this.assemblyChart.hoverParty(party);
  }

  chartState() {
    return {data: _.cloneDeep(this.props.data)};
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
