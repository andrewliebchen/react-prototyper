import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import { Message } from 'rebass';
import classNames from 'classnames';
import { X } from 'reline';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/theme/tomorrow-night-bright.css';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';

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

  handleDelete() {
    if (window.confirm('Sure you want to do that?')) {
      Meteor.call('deleteComponent', this.props.element._id);      
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
      matchBrackets: true,
      matchTags: true,
    };

    return (
      <div className={classNames({
        'Editor': true,
        'hasBorder': !this.props.noBorder,
      })}>
        {this.state.error &&
          <Message theme="error">{this.state.error}</Message>}
        <CodeMirror
          value={userCode && userCode}
          options={options}
          onChange={(value) => {
            this.setState({userCode: value});
            this.handleUpdate();
          }}/>
        {this.props.canDelete &&
          <X
            className="EditorDelete"
            onClick={this.handleDelete.bind(this)}/>}
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
  type: PropTypes.oneOf([
    'component',
    'state',
    'event',
  ]),
  canDelete: PropTypes.bool,
};

export default Editor;
