// npm deps
import * as _ from 'lodash';
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SwipeableViews from 'react-swipeable-views';
import bindKeyboard from 'react-swipeable-views/lib/bindKeyboard';

// MUI
import {indigo500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// internal deps
import theme  from '../../components/theme';
import Brand  from '../../components/Brand';
import Footer from '../../components/Footer';
import Presentation from '../../components/Presentation';
import Socials from '../../components/Socials';
import {extendMeta} from '../../components/Socials/Config';

import Ballots from './ballots/Ballots';

// component deps
import s from './Study.css';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

class Study extends React.Component {
  constructor(props,context,updater){
    super(props, context, updater);
    this.tabsContent = {};
    this.state = Object.assign({
      index:props.activeIndex,
      modals:this.initModals()
    });
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

  initModals(){
    this.modals = this.props.tabs.filter(tab=>tab.isModal);
    return this.modals.map(modal=>{
      return { [modal.key]: false };
    });
  }

  closeModal(modal){
    this.setState({ modals: {[modal.key]: false} });
  }

  getModals(){
    return this.modals.map((modal,key)=>{
      const modalContent = React.createElement(
        modal.component, modal.componentProps, null
      );
      return (
        <Dialog
          key={key}
          title={modal.title}
          style={{height: '80vh'}}
          open={this.state.modals[modal.key]||false}
          actions={[
            <FlatButton label="Fermer" primary={true}
              onClick={this.closeModal.bind(this, modal)}
              onTouchTap={this.closeModal.bind(this, modal)}/>,
          ]}
          modal={true}
          autoScrollBodyContent={true}
          onRequestClose={this.closeModal.bind(this, modal)}>
          { modalContent }
        </Dialog>
      );
    });
  }

  currentTab(){
    const { index } = this.state;
    return this._children[index];
  }

  hasNestedSwipeableView(){
    const component = this.currentTab();
    if(!component){ return false; }
    return component.hasSwipeableViews();
  }

  openModal(tab){
    this.setState({ modals: { [tab.key]: true }});
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

    if(this.props.onChangeIndex && !this.hasNestedSwipeableView()){
      _.defer(()=>{
        _.delay(()=>{
          const { index } = this.state;
          this.props.onChangeIndex(index);
        }, 500);
      });
    }
  }

  onTabClick(i){
    const tab = this.props.tabs[i];
    if(tab.isModal){
      this.openModal(tab);
    } else {
      this.setState({ index: i });
      if(this.props.onChangeIndex){
        this.props.onChangeIndex(i);
      }
    }
  }

  tabs(){
    const tabs = this.props.tabs.map((tab,key)=>{
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

  getTabsContent(){
    const {
      index,
    } = this.state;
    let tabsContent = this.tabsContent;
    let tabs = this.props.tabs.filter(tab=>!tab.isModal);
    return this.props.tabs.filter(tab=>!tab.isModal).map((tab, key)=>{
      let tabContent = this.tabsContent[key] || {};
      const isActive = key == index;
      const props = Object.assign({},{
        isActive: isActive,
        onRef: (comp)=>{ this._children[key]=comp }
      }, tab.componentProps);
      return (
        <div className={s.innerTab} key={key}>
          { React.createElement(tab.component, props, null) }
          <Footer/>
        </div>
      );
    });
  }

  render(){
    const {index,} = this.state;
    const InkBarStyle = {
      backgroundColor:theme.palette.primary2Color,
      marginTop: 0
    };
    const BrandStyle = {
      flex:null,
      width:100,
      textAlign: 'center',
      height: 63,
      lineHeight:'63px'
    };
    const activeTab = this.props.tabs[index];
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className={s.root}>
          { this.getModals() }
          <Presentation/>
          <Socials mobile={false}/>
          <Helmet title={ activeTab.title + ' | Dérangeons la chambre'} meta={extendMeta(activeTab.meta)}/>
          <AppBar className={s.appBar} showMenuIconButton={false}
              title={<Brand/>}  titleStyle={BrandStyle}
              onLeftIconButtonTouchTap={ null }>
              <Tabs className={s.appBarTabs} inkBarStyle={InkBarStyle}
                    contentContainerStyle={{ marginTop:0, width:'100%' }} value={ index }>
                { this.tabs() }
              </Tabs>
          </AppBar>
          <BindKeyboardSwipeableViews className={s.content}
            style={{ overflowY:'hidden', maxHeight: '100vh'}}
            onChangeIndex={ this.onChangeIndex.bind(this) }
            index={ index }>
            { this.getTabsContent() }
          </BindKeyboardSwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Study);
