import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Presentation.css';
import Layout from '../Layout';
import { Keyboard, SwipeLeft, Slash } from '../Pictos';



class Presentation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: true
    };
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState.visible != this.state.visible;
  }

  onClick(){
    this.setState({ visible: false });
  }

  render(){
    const { visible } = this.state;
    const className = s.presentation + ' ' + (visible ? '' :  s['presentation--hidden']);

    return (<Layout>
      <div className={className} onClick={this.onClick.bind(this)}>
        <div className={s.presentation__content}>
          <p className={s.lead}>Cette application propose une navigation au clavier ou au swipe pour les mobiles et tablettes.</p>
          <p className={s.pictos}>
            <Keyboard  style={{ width: 110, height: 150 }}/>
            <Slash style={{width: 150, height: 150 }}/>
            <SwipeLeft style={{ width: 100, height: 100 }}/>
          </p>
          <p className={s.lead}>Cliquez n'importe où pour continuer</p>
        </div>
      </div>
    </Layout>);
  }
}

export default withStyles(s)(Presentation);
