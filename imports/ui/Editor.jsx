import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import { Tooltip } from 'rebass';
import { X, Triangle } from 'reline';

import styles from '../styles/Editor';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/theme/dracula';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCode: this.props.element.userCode,
      error: false,
      focused: false,
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
        component: this.props.component,
      }, (error, success) => {
        this.setState({error: error});
      });
    }
  }

  handleDelete() {
    if (window.confirm('Sure you want to do that?')) {
      Meteor.call('deleteElement', {
        id: this.props.element._id,
        type: this.props.type,
      });
    }
  }

  _defineMode() {
    let mode;
    switch (this.props.type) {
      case 'component':
        mode = 'jsx';
      case 'style':
        mode = 'css';
      default:
        mode = 'javascript';
    }
    return mode;
  }

  render() {
    const { userCode, error, focused } = this.state;
    const options = {
      lineNumbers: true,
      smartIndent: false,
      viewportMargin: Infinity,
      mode: this._defineMode(),
      theme: 'dracula',
      smartIndent: this.props.type === 'component' ? true : false,
      matchBrackets: true,
      matchTags: true,
      showCursorWhenSelecting: true,
    };

    return (
      <div className={styles.Editor}>
        <div
          className={styles.CodeMirrorWrapper}
          style={{borderColor: focused && '#0088ee'}}>
          <CodeMirror
            value={userCode && userCode}
            options={options}
            onChange={(value) => {
              this.setState({userCode: value});
              this.handleUpdate();
            }}
            onFocusChange={(focused) => this.setState({focused: focused})}/>
          <div className={styles.EditorActions}>
            <Triangle up className={error ? styles.EditorErrorActive : styles.EditorError}/>
            {this.props.canDelete &&
              <X
                className={styles.EditorDelete}
                onClick={this.handleDelete.bind(this)}/>}
          </div>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  element: PropTypes.PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  type: PropTypes.oneOf([
    'component',
    'style',
    'state',
  ]),
  canDelete: PropTypes.bool,
  component: PropTypes.string,
};

export default Editor;
