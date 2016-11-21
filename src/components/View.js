import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import Layout from './Layout';

export const ViewPropTypes = {
  isActive: PropTypes.bool.isRequired
};

export class View extends React.Component {
  static propTypes = Object.assign({}, {
    helmetProps: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
  }, ViewPropTypes );

  render(){
    return (
      <Layout>
        { this.props.isActive &&
          <Helmet {...this.props.helmetProps}/>
        }
        { this.props.children }
      </Layout>
    )
  }
}
