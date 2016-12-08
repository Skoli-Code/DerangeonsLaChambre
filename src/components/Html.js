/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { analytics } from '../config';

function Html({ head, style, script, chunk, children }) {
  let meta, title;
  if(head){
    meta = head.meta.toComponent();
    title = head.title.toComponent();
  }
  return (
    <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        { meta }
        { title }
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Lato:100,300,400,700"
      rel="stylesheet"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {style && <style id="css" dangerouslySetInnerHTML={{ __html: style }} />}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {script && <script src={script} />}
        {chunk && <script src={chunk} />}
        <script
          dangerouslySetInnerHTML={{ __html:
          'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
          `ga('create','UA-82419929-2','auto');ga('send','pageview')` }}
        />
        <script src="https://www.google-analytics.com/analytics.js" async defer />
      </body>
    </html>
  );
}

Html.propTypes = {
  head: PropTypes.object,
  // title: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
  style: PropTypes.string,
  script: PropTypes.string,
  chunk: PropTypes.string,
  children: PropTypes.string,
};

export default Html;
