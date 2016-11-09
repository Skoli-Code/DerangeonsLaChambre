import Study from './Study';
import React from 'react';

export default {
  path: '/%C3%A9tude',
  children: [
    require('./introduction').default,
    // require('./scrutins').default,
    // require('./conclusion').default,
  ],
  async action({ next }){
    const routes = await Promise.all(this.children.map((r)=>r.action()));
    let route = await next();
    let routeIndex = routes.indexOf(route) >= 0;
    if(routeIndex < 0){
      routeIndex = 0;
      route = routeIndex[routeIndex];
    }

    return {
      title: route.title,
      component: <Study tabs={ routes } activeIndex={ routeIndex }/>
    }
  }
}
