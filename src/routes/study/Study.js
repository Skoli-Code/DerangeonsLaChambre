// npm deps
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SwipeableViews from 'react-swipeable-views';
import bindKeyboard from 'react-swipeable-views/lib/bindKeyboard';
// MUI
import AppBar from 'material-ui/AppBar/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



// internal deps
import theme from '../../components/theme';
import Brand from '../../components/Brand';

// component deps
import s from './Study.css';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

class Study extends React.Component {
  // setState(state){ this.state = state; }

  constructor(props,context,updater){
    super(props, context, updater);
    this.state = {index:props.activeIndex };
    this.onTabClick = this.onTabClick.bind(this);
  }

  static propTypes = {
    onChangeIndex: PropTypes.func,
    activeIndex: PropTypes.number,
    tabs: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      component: PropTypes.node
    }))
  };
  onChangeIndex(i){
    this.setState({index:i});
    if(this.props.onChangeIndex){
      this.props.onChangeIndex(i);
    }
  }
  onTabClick(i){
    this.setState({ index: i });
    if(this.props.onChangeIndex){
      this.props.onChangeIndex(i);
    }
  }

  render(){
    const {
      index,
    } = this.state;

    const tabs = this.props.tabs.map((tab,key)=>{
      return <Tab onClick={ this.onTabClick.bind(this, tab.key) } style={ {height: 62 } } key={ key} value={tab.key} label={tab.title}/>;
    });

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <AppBar
              showMenuIconButton={false}
              title={<Brand/>}
              titleStyle={ {flexGrow:1} }
              onLeftIconButtonTouchTap={ null }
              iconStyleRight={ {flexGrow: 10} }
              iconElementRight={
                <Tabs contentContainerStyle={{ marginTop:0 } }value={ index }>{ tabs }</Tabs>
              }></AppBar>
          <BindKeyboardSwipeableViews
            onChangeIndex={ this.onChangeIndex.bind(this) }
            index={ index }>
          { this.props.tabs.map((tab)=>{
            return tab.component;
          })}
          </BindKeyboardSwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Study);
