// npm deps
import React, {PropTypes} from 'react';
import { Converter } from 'react-showdown';
import Link from '../Link';

const MD_COMPONENTS = {
  Link: Link,
};

const converter = new Converter({components: MD_COMPONENTS});
export default class Markdown extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired
  };

  render(){
    const parsedContent = converter.convert(this.props.content);
    return (
      <div>{ parsedContent }</div>
    )
  }
}
