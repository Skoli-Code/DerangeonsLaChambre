// inspired from https://github.com/kauffecup/react-bubble-chart/
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import {BallotPropTypes, PartiesPropTypes} from '../Ballot';

let objectStyle = (sel, styles)=>{
  for(const k in styles){
    sel.style(k, styles[k]);
  }
  return sel;
}

class D3BallotChart {
  constructor(el, props) {
    this.$chart = d3.select(el);
    this.initChart();
    this.updateData(props.data);
    this.updateSize();
    this.draw();
  }

  initChart(){
    const chartStyle = {
      'display': 'flex',
      'flex-direction': 'column',
      'flex-wrap': 'wrap',
    }
    for(const k in chartStyle){
      this.$chart.style(k, chartStyle[k]);
    }
  }

  updateData(data){
    this.results = data.ballot.results.sort((a,b)=>b.result - a.result);
    this.squares = [];
    for(const i in this.results){
      const ballot = this.results[i];
      const r = d3.range(ballot.result);
      const squares = r.map((i)=>ballot.party);
      this.squares = this.squares.concat(squares);
    }
    console.log('this.squares: ', this.squares);
    this.parties = data.parties;
  }

  updateSize(){
    const w = Math.floor(this.$chart.node().parentNode.getBoundingClientRect().width);
    let h = Math.floor(w * 0.33);
    console.log('w:', w);
    const squareSize = { width: 10, height: 10, margin: 2 };

    this.size = {
      padding: 2,
      square: squareSize,
      width: w,
      height: h
    }

    objectStyle(this.$chart, {
      width:  this.size.width+'px',
      height: this.size.height+'px'
    });
  }

  update(el, props) {
    this.$chart = d3.select(el);
    this.updateData(props.data);
    this.updateSize();
    this.draw();
  }

  bindEvents(){
    this.$squares.on('mousehover', this.onHover.bind(this));
  }

  draw(){
    const size = this.size.square;
    // process:
    // for each party, draw every square based on the latest square drawn
    let $squares = this.$chart.selectAll('.square')
      .data(this.squares);

    let style = (squares)=>{
      squares.style('background', (d)=>this.parties.find((p)=>p.id == d).color);
      objectStyle(squares, {
        flex: '0 0 '+size.width+'px',
        width: size.width + 'px',
        height: size.height + 'px',
        opacity: 0.2
      });
    }

    let $squareEnter = $squares.enter()
      .append('div')
      .attr('class', (d)=>`square ${d}`);

    style($squareEnter);
    style($squares);

    $squares.exit().remove();
  }
}

export class BallotChart extends React.Component {
  static propTypes = { data:PropTypes.shape({
    parties: PartiesPropTypes, ballot:BallotPropTypes
  })}
  constructor(props) {
    super(props);
    // define the method this way so that we have a clear reference to it
    // this is necessary so that window.removeEventListener will work properly
    this.handleResize = (e => this._handleResize(e));
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.bubbleChart = new D3BallotChart(this.node(), this.chartState());
  }

  chartState() {
    return {data: this.props.data};
  }

  componentDidUpdate() {
    this.bubbleChart.update(this.node(), this.chartState());
  }

  render() {
    return (
      <div className="chart"></div>
    );
  }

  /** Helper method to reference this dom node */
  node() {
    return ReactDOM.findDOMNode(this);
  }

  _handleResize(e) {
    this.__resizeTimeout && clearTimeout(this.__resizeTimeout);
    this.__resizeTimeout = setTimeout(() => {
      this.bubbleChart.update(this.node(), this.chartState());
      delete this.__resizeTimeout;
    }, 200);
  }
}

export default BallotChart;
