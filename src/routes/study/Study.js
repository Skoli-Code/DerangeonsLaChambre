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

import Ballots from './ballots/Ballots';

// component deps
import s from './Study.css';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

class Study extends React.Component {
  constructor(props,context,updater){
    super(props, context, updater);
    this.state = {index:props.activeIndex };
    this.onTabClick = this.onTabClick.bind(this);
    this._children = {};
  }

  static propTypes = {
    onChangeIndex: PropTypes.func,
    activeIndex: PropTypes.number,
    tabs: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      component: PropTypes.node,
      componentProps: PropTypes.object
    }))
  };

  currentTab(){
    const { index } = this.state;
    return this._children[index];
  }

  hasNestedSwipeableView(){
    const component = this.currentTab();
    if(!component){ return false; }
    return component.hasSwipeableViews();
  }


  onChangeIndex(i){
    const { index } = this.state
    if(this.hasNestedSwipeableView()){
      const nestedView = this.currentTab();
      if(i > index){
        if(!nestedView.atLastTab()){
          nestedView.goNext();
        } else {
          this.setState({index:i});
        }
      } else {
        if(!nestedView.atFirstTab()){
          nestedView.goPrevious();
        } else {
          this.setState({index:i});
        }
      }
    } else {
      this.setState({index:i});
    }
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
      return <Tab onClick={ this.onTabClick.bind(this, key) } style={ {height: 62 } } key={key} value={key} label={tab.title}/>;
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
                <Tabs contentContainerStyle={{ marginTop:0 } }value={ index }>
                  { tabs }
                </Tabs>
              }></AppBar>
          <BindKeyboardSwipeableViews
            onChangeIndex={ this.onChangeIndex.bind(this) }
            index={ index }>
          { this.props.tabs.map((tab, key)=>{
            const props = Object.assign(tab.componentProps || {}, {
                isActive: index == key,
                onRef: (ref)=> this._children[key] = ref
              });
            const tabComponent = React.createElement(tab.component, props , null);
            return <div key={key}>
              { tabComponent }
            </div>;
          })}
          </BindKeyboardSwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Study);
