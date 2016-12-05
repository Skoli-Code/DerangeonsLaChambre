// npm deps
import * as _ from 'lodash';

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SwipeableViews from 'react-swipeable-views';
import bindKeyboard from 'react-swipeable-views/lib/bindKeyboard';

// MUI
import AppBar from 'material-ui/AppBar/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// internal deps
import theme from '../../components/theme';
import Brand from '../../components/Brand';
import Presentation from '../../components/Presentation';

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
      mobileIcon: PropTypes.string,
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
    const { index } = this.state;
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
    // we defer the callback to ensure it won't be fired when animating.

    if(this.props.onChangeIndex){
      _.defer(()=>{
        _.delay(()=>{
          const { index } = this.state;
          this.props.onChangeIndex(index);
        }, 500);
      });
    }
  }

  onTabClick(i){
    this.setState({ index: i });
    if(this.props.onChangeIndex){
      this.props.onChangeIndex(i);
    }
  }

  tabs(){
    const tabs = this.props.tabs.map((tab,key)=>{
      console.log('tab.mobileIcon:', tab.mobileIcon);
      const hasIcon = tab.mobileIcon != null;
      const klassName = s.tab + ' ' + (hasIcon ? s.tabWithIcon : '');
      let tabProps = {
        className:klassName,
        onClick:this.onTabClick.bind(this, key),
        style:{height: 62},
        key:key,
        value:key,
        label:<div className={ s.tabText }>{ tab.title}</div>
      }
      if(hasIcon){
        tabProps['icon'] = <FontIcon className={s.tabIcon + ' material-icons'}>{tab.mobileIcon}</FontIcon>;
      }
      return <Tab {...tabProps}/>;
    });
    return tabs;
  }

  render(){
    const {
      index,
    } = this.state;

    const BrandStyle = {
      flex:null,
      width:100,
      textAlign: 'center',
      height: 63,
      lineHeight:'63px'
    };
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <Presentation/>
          <AppBar
              className={s.appBar} showMenuIconButton={false}
              title={<Brand/>} titleStyle={BrandStyle}
              onLeftIconButtonTouchTap={ null }>
              <Tabs className={s.appBarTabs} contentContainerStyle={{ marginTop:0, width:'100%' } } value={ index }>
                { this.tabs() }
              </Tabs>
              </AppBar>
          <BindKeyboardSwipeableViews
            className={s.content}
            onChangeIndex={ this.onChangeIndex.bind(this) }
            index={ index }>
          { this.props.tabs.map((tab, key)=>{
            const props = Object.assign(tab.componentProps || {}, {
                isActive: index == key,
                onRef: (ref)=> this._children[key] = ref
              });
            const tabComponent = React.createElement(tab.component, props , null);
            return <div className={s.innerTab} key={key}>
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
