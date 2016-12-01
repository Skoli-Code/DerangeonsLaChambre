// inspired from https://github.com/kauffecup/react-bubble-chart/
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as d3 from 'd3';
import * as _ from 'lodash';

import s from './BallotTreemapChart.css';
import { ChartPropTypes } from '../PropTypes';
import { objectStyle } from '../utils';
import ChartConfig from '../config';

let px = (n)=>`${n}px`;

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

  update(el, props) {
    this.$chart = d3.select(el);
    this.updateSize();
    this.updateData(props.data);
    this.draw();
  }

  initChart(){
    this.$chart.style('position', 'relative');
    this.treemap = d3.treemap().padding(1).round(true);
  }

  updateSize() {
    // width = parent node width.
    // height = height of the golden ratio rectangle
    let width = this.$chart.node().parentNode.getBoundingClientRect().width;
    if(isNaN(width) || !width){
      width = 800;
    }
    const height = width*0.618033989;
    this.treemap = this.treemap.size([width, height])
  }

  updateData(data) {
    let stratify = d3.stratify();
    this.results = data.results.sort((a,b)=>b.seats-a.seats);
    this.results = this.results.filter(r=>r.seats > 0)
      .map(r=>(r.parentId='root',r));
    this.results.push({parentId:null, id:'root'});
    this.root = stratify(this.results).sum(r=>r.seats);
    console.log('root', this.root);
  }

  bindEvents() {
  }

  backgroundColor(result){
    console.log(result);
    let color = (result.data.party||{}).color;
    if(color == null){
      color = 'white';
    }
    if(color == 'random'){
      color = this.config.randomParty.singleColor;
    }
    return color;
  }

  draw() {
    const tree = this.treemap(this.root);
    const $leaves = this.$chart.selectAll('.party')
      .data(tree.leaves())
      .enter().append('div')
        .attr('class', (r)=>`party ${r.data.party.id}`)
        .attr('title', (r)=> `${r.data.party.name}\n${r.value} sièges`);

      objectStyle($leaves, {
        position:   'absolute',
        background: (d)=>this.backgroundColor(d),
        left:       (d)=>px(d.x0),
        top:        (d)=>px(d.y0),
        width:      (d)=>px(d.x1-d.x0),
        height:     (d)=>px(d.y1-d.y0)
      });

      const $labels = $leaves.append('div')
        .attr('class', 'party__label')
        .html((r)=>`<b>${r.data.party.name}</b><br/>${r.value} sièges`);

      objectStyle($labels, {

      });

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
