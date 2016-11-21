// inspired from https://github.com/kauffecup/react-bubble-chart/
import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class D3BallotChart {
  constructor(el, props) {
    this.$svg = d3.select(el);
    this.updateData(props.data);
    this.updateSize();
    this.draw();
  }

  updateData(data){
    this.ballot = data.ballot;
    this.parties = data.parties;
  }

  updateSize(){
    this.$svg.attr('width', '400px').attr('height','400px');
  }

  update(el, props) {
    this.$svg = d3.select(el);
    this.updateData(props.data);
    this.updateSize();
  }

  draw(){

  }
}

export class BallotChart extends React.Component {
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
      <svg></svg>
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
