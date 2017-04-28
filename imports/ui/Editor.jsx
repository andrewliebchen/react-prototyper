import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import { Message } from 'rebass';
import classNames from 'classnames';
import ReactInterval from 'react-interval';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/theme/tomorrow-night-bright.css';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCode: this.props.element.userCode,
      error: null,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    // Check to see if things have changed, if so update...
    if (this.state.userCode !== this.props.element.userCode) {
      Meteor.call('updateElement', {
        type: this.props.type,
        id: this.props.element._id,
        userCode: this.state.userCode,
        updatedAt: Date.now(),
      }, (error, success) => {
        if (error) {
          this.setState({error: error.message});
        } else {
          this.setState({error: null});
        }
      });
    }
  }

  render() {
    const { userCode } = this.state;
    const options = {
      lineNumbers: true,
      smartIndent: true,
      viewportMargin: Infinity,
      mode: this.props.type === 'component' ? 'jsx' : 'javascript',
      theme: 'tomorrow-night-bright',
      smartIndent: this.props.type === 'component' ? true : false,
    };

    return (
      <div className={classNames({
        'Editor': true,
        'hasBorder': !this.props.noBorder,
      })}>
        <ReactInterval
          timeout={3000}
          enabled={true}
          callback={() => {
            this.handleUpdate()}
          }/>
        {this.state.error &&
          <Message theme="error">{this.state.error}</Message>}
        <CodeMirror
          value={userCode && userCode}
          onChange={(value) => { this.setState({userCode: value}) }}
          options={options}/>
      </div>
    );
  }
}

Editor.propTypes = {
  element: PropTypes.PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  noBorder: PropTypes.bool,
  type: PropTypes.oneOf(['component', 'state']),
};

export default Editor;
