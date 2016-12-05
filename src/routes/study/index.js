import Study from './Study';
import React from 'react';
import history from '../../core/history';

import ConfigureContentRoute from './content';

export default {
  path : '/%C3%A9tude',
  children : [
    ConfigureContentRoute('introduction','Intro', 0),
    require('./ballots').default,
    ConfigureContentRoute('conclusion','Bilan', 2),
    ConfigureContentRoute('à-propos','À propos', 3),
    ConfigureContentRoute('méthodologie','Méthodologie', 3),
    // ConfigureContentRoute('à-propos',3)
  ],
  onChangeIndex(index){
    if(typeof index != typeof 0 || !history){ return; }
    let route = this.children[index];
    let path = this.path + route.path;
    history.push(path);
  },
  async action({next}) {
    let route = await next();
    let routeIndex = route.key;
    if(!route){
      routeIndex = 0;
    }
    const routes = await Promise.all(this.children.map((r) => r.action()));
    if (!route) {
      route = routes[0];
    }
    return {
      title: route.title,
      component: <Study onChangeIndex={this.onChangeIndex.bind(this)}
        tabs={routes}
        activeIndex={routeIndex}/>}
  }
};
