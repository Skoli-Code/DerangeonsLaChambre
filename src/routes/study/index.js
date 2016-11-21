import Study from './Study';
import React from 'react';
import history from '../../core/history';

export default {
  path : '/%C3%A9tude',
  children : [
    require('./introduction').default,
    require('./ballots').default,
    require('./conclusion').default
  ],
  onChangeIndex(index){
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
