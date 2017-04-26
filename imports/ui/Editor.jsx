import React from 'react';
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

const Editor = (props) =>
  <div className="Editor">
    <CodeMirror
      value={props.code}
      onChange={(value) => { return props.handleUpdate(value) }}
      options={options}/>
    <button
      onClick={props.handleSubmit}
      style={{
        position: 'absolute',
        bottom: '1em',
        right: '1em',
      }}>
      Send
    </button>
  </div>

export default Editor;
