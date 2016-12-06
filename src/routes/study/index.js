import Study from './Study';
import React from 'react';
import history from '../../core/history';

import ConfigureContentRoute from './content';
let routes;
export default {
  path : '/%C3%A9tude',
  children : [
    ConfigureContentRoute({ path: 'introduction', title: 'Intro', key: 0}),
    require('./ballots').default,
    ConfigureContentRoute({ path: 'conclusion', title: 'Bilan', key: 2}),
    ConfigureContentRoute({ path: 'à-propos', title: 'À propos', key: 3, mobileIcon:'info'}),
    ConfigureContentRoute({ path: 'méthodologie',title: 'Méthodologie', key: 4, mobileIcon:'description', isModal:true}),
  ],
  onChangeIndex(index){
    if(typeof index != typeof 0 || !history){ return; }
    let route = this.children[index];
    let path = this.path + route.path;
    history.push(path);
  },
  async action({next}) {
    let route = await next();
    const trueRoute = route;
    let routeIndex = route.key;
    if(!route){
      routeIndex = 0;
    }
    routes = (routes && routes.length) ? routes : await Promise.all(this.children.map((r) => r.action()));
    route = routes[routeIndex];

    if(trueRoute){
      routes[routeIndex] = trueRoute;
    }

    return {
      title: route.title,
      component: <Study onChangeIndex={this.onChangeIndex.bind(this)}
        tabs={routes}
        activeIndex={routeIndex}/>
    }
  }
};
