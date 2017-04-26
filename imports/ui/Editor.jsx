import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/theme/tomorrow-night-eighties.css';

options = {
  lineNumbers: true,
  smartIndent: true,
  autoFocus: true,
  mode: 'jsx',
  theme: 'tomorrow-night-eighties',
};

class Editor extends Component {
  constructor(props) {
    super(props);

    const { components } = this.props;
    this.state = {
      jsx: null,
    };
  }

  handleSubmit() {
    Meteor.call('returnReact', {
      jsx: this.state.jsx,
      createdAt: Date.now(),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ jsx: nextProps.components });
  }

  render() {
    const { jsx } = this.state;
    return (
      <div className="Editor">
        <CodeMirror
          value={jsx && jsx[0].jsx}
          onChange={(value) => { this.setState({jsx: value}) }}
          options={options}/>
        <button
          className="Button"
          onClick={this.handleSubmit.bind(this)}>
          Send
        </button>
      </div>
    );
  }
}

Editor.propTypes = {
  components: PropTypes.array.isRequired,
};

export default Editor;
