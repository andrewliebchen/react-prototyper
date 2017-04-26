import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import { ButtonOutline } from 'rebass';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/theme/tomorrow-night-bright.css';

options = {
  lineNumbers: true,
  smartIndent: true,
  viewportMargin: Infinity,
  mode: 'jsx',
  theme: 'tomorrow-night-bright',
};

class Editor extends Component {
  constructor(props) {
    super(props);

    const { element } = this.props;
    this.state = {
      userCode: this.props.element.jsx, // Need to not be specific in the schema
    };
  }

  handleUpdate() {
    Meteor.call('updateComponent', {
      id: this.props.element._id,
      jsx: this.state.userCode,
      updatedAt: Date.now(),
    });
  }

  render() {
    const { userCode } = this.state;
    return (
      <div className="Editor">
        <CodeMirror
          value={userCode && userCode}
          onChange={(value) => { this.setState({userCode: value}) }}
          options={options}/>
        <ButtonOutline
          onClick={this.handleUpdate.bind(this)}
          style={{
            position: 'absolute',
            bottom: '1em',
            right: '1em',
            zIndex: 9999,
          }}>
          Update
        </ButtonOutline>
      </div>
    );
  }
}

Editor.propTypes = {
  element: PropTypes.object.isRequired,
};

export default Editor;
