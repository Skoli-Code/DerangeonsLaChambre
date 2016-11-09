import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Study.css';
import SwipeableViews from 'react-swipeable-views';
import bindKeyboard from 'react-swipeable-views/lib/bindKeyboard';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function Study({activeIndex, tabs}){
  return (
    <div>
      <BindKeyboardSwipeableViews index={ activeIndex }>
        { tabs.map((tab)=>{
          return tab.component;
        })}
      </BindKeyboardSwipeableViews>
    </div>
  );
}

Study.propTypes = {
  activeIndex: PropTypes.number,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    component: PropTypes.node
  }))
};

export default withStyles(s)(Study);
