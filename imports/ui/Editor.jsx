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

    const { components } = this.props;
    this.state = {
      jsx: this.props.component.jsx,
    };
  }

  handleUpdate() {
    Meteor.call('updateComponent', {
      id: this.props.component._id,
      jsx: this.state.jsx,
      updatedAt: Date.now(),
    });
  }

  render() {
    const { jsx } = this.state;
    return (
      <div className="Editor">
        <CodeMirror
          value={jsx && jsx}
          onChange={(value) => { this.setState({jsx: value}) }}
          options={options}/>
        <ButtonOutline
          className="Button"
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
  component: PropTypes.object.isRequired,
};

export default Editor;
