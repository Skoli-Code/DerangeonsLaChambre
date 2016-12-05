// npm deps
import React, {PropTypes} from 'react';
import { Converter, Markdown as MD } from 'react-showdown';
import Link from '../Link';

const MD_COMPONENTS = {
  Link: Link,
};

// const converter = new Converter({components: MD_COMPONENTS, extensions:['table']});
export default class Markdown extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired
  };

  render(){
    // const parsedContent = converter.convert(this.props.content);
    return (
      <MD markup={ this.props.content } components={ MD_COMPONENTS }/>
    )
  }
}
