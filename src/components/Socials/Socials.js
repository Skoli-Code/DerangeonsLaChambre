import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FacebookProvider, { Share } from 'react-facebook';
import SocialConfig from './Config';
import Link from '../Link';
import {Facebook, Twitter, LinkedIn} from '../Pictos';
import s from './Socials.css';

import history from '../../core/history';

class Socials extends React.Component {
  constructor(props){
    super(props);
    this.config = SocialConfig;
    console.log('config', this.config, 'hasNestedSwipeableView: ', props.hasNestedSwipeableView);
  }

  shouldComponentUpdate(nextProps){
    return this.props.hasNestedSwipeableView != nextProps.hasNestedSwipeableView;
  }

  fbAppId(){
    const appId = this.config.helmet.meta.find(m=>m.property=='fb:app_id');
    return appId.content
  }

  href(){
    return window ? window.location.href : 'http://derangeonslachambre.fr';
  }


  onTwitterClick(e){
    e.preventDefault();
    const href = this.twitterHref();
    this.openSocialModal('Partagez sur twitter', href, 780, 400 );
  }

  onLinkedInClick(e){
    e.preventDefault();
    const href = this.linkedInHref();
    this.openSocialModal('Partagez sur LinkedIn', href, 500, 800 );
  }

  openSocialModal(name, href, w, h){
    let ww = window.innerWidth;
    let wh = window.innerHeight;
    let wstyle = `
        height=${h},width=${w},top=${(wh/2)-h/2},left=${(ww/2)-(w/2)},
        toolbar=0,location=0
    `;
    window.open(href, name, wstyle);
  }

  twitterHref(){
    const url = encodeURIComponent(this.href());
    return  `https://twitter.com/intent/tweet?text=${this.config.twitter.tweet_text}&url=${url}&hashtags=${this.config.twitter.hashtags}`;

  }

  linkedInHref(){
    const meta = this.config.linkedIn;
    const url = encodeURIComponent(this.href());
    return  `https://www.linkedin.com/shareArticle?url=${url}&source=${meta.source}&title=${meta.title}&summary=${meta.summary}&mini=true`;
  }

  render(){
    return (
        <div className={s.socials + ' ' + (this.props.hasNestedSwipeableView ? s['socials--nested']: '')}>
          <ul>
            <li>
              <FacebookProvider appID={this.fbAppId()}>
                <Share><Facebook/></Share>
              </FacebookProvider>
            </li>
            <li>
              <div onClick={ this.onTwitterClick.bind(this) }>
                <Twitter/>
              </div>
            </li>
            <li>
              <div onClick={ this.onLinkedInClick.bind(this) }>
                <LinkedIn/>
              </div>
            </li>
          </ul>
        </div>
    );
  }
}

export default withStyles(s)(Socials);
