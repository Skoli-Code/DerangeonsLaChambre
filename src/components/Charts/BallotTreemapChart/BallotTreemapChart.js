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
  }

  update(el, props) {
    this.$chart = d3.select(el);
    this.updateSize();
    this.updateData(props.data);
    this.draw();
  }

  initChart(){
    this.$chart.style('position', 'relative');
    this.treemap = d3.treemap().padding(0).round(true);
  }

  updateSize() {
    // width = parent node width.
    // height = height of the golden ratio rectangle
    let width = this.$chart.node().getBoundingClientRect().width;
    if(isNaN(width) || !width){
      width = 800;
    }
    const height = width*0.618033989;
    this.treemap = this.treemap.size([width, height]);
    objectStyle(this.$chart, { width: px(width), height: px(height) });
  }

  updateData(data) {
    let stratify = d3.stratify();
    const results = _.cloneDeep(data.results);
    this.results = results.sort((a,b)=>b.seats-a.seats);
    this.results = this.results.filter(r=>r.seats > 0)
      .map(r=>(r.parentId='root',r));
    this.results.push({parentId:null, id:'root'});
    this.root = stratify(this.results).sum(r=>r.seats);
  }

  bindEvents() {
  }
  textColor(result){
    const bgColor = this.backgroundColor(result);
    if(bgColor == 'white' || bgColor == this.config.randomParty.singleColor){
      return '#444';
    } else {
      return 'white';
    }

  }
  backgroundColor(result){
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
    let self = this;
    let leavesClass = (r)=>`party ${r.data.party.id}`;
    let leavesHtml  = (r)=>`<b>${r.data.party.name}</b><br/>${r.value} sièges`;
    let leavesTitle = (r)=>`${r.data.party.name}\n${r.value} sièges`;
    let leavesStyle = ($leaves)=>{
      objectStyle($leaves, {
        left:       (d)=>px(d.x0),
        top:        (d)=>px(d.y0),
        width:      (d)=>px(d.x1-d.x0),
        height:     (d)=>px(d.y1-d.y0),
        color:      (d)=>this.textColor(d),
        border:     (d)=>this.backgroundColor(d) == 'white' ? '1px solid #bbb' : '0',
        background: (d)=>this.backgroundColor(d)
      });
    };

    const tree = this.treemap(this.root);
    const $leaves = this.$chart.selectAll('.party')
      .data(tree.leaves());

    // create
    const $leavesEnter = $leaves
      .enter().append('div')
        .attr('class', leavesClass)
        .attr('title', leavesTitle);

    objectStyle($leavesEnter, {
      position: 'absolute',
      overflow: 'hidden',
      'padding-left': '5px',
    });

    leavesStyle($leavesEnter);

    const $labels = $leavesEnter.append('div')
      .attr('class', 'party__label')
      .html(leavesHtml);

    objectStyle($labels, {
      overflow: 'hidden',
      width: '100%'
    });

    // udpate
    leavesStyle($leaves);
    $leaves.attr('class', leavesClass).attr('title', leavesTitle);
    $leaves.select('.party__label').html(leavesHtml);

    // delete
    $leaves.exit().remove();

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
