/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import expressGraphQL from 'express-graphql';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import {ErrorPageWithoutStyle} from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import {port, auth} from './config';
import schema from './data/schema';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: {
    request: req
  },
  pretty: process.env.NODE_ENV !== 'production',
  formatError: error => ({message: error.message, locations: error.locations, stack: error.stack})
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async(req, res, next) => {
  try {
    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      }
    };

    const route = await UniversalRouter.resolve(routes, {
      path: req.path,
      query: req.query
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }
    const data = {
      ...route
    };
    data.children = ReactDOM.renderToString(
      <App context={context}>{route.component}</App>
    );
    const head = Helmet.rewind();
    data.head = head;
    data.style = [...css].join('');
    data.script = assets.main.js;
    data.chunk = assets[route.chunk] && assets[route.chunk].js;
    const html = ReactDOM.renderToStaticMarkup(<Html {...data}/>);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const data = {};
  data.children = ReactDOM.renderToStaticMarkup(
    <div>
      <Helmet title="Internal Server Error" meta={[{
          'name': 'description',
          'content': err.message
        }
      ]} style={[{
          "cssText": errorPageStyle._getCss()
        }
      ]}/>
      <ErrorPageWithoutStyle error={err}/>);
    </div>
  );

  const html = ReactDOM.renderToStaticMarkup(<Html {...data}/>);
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
/* eslint-enable no-console */
