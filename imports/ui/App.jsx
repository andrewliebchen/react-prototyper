import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'react-codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/theme/tomorrow-night-eighties.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      component: null,
    };
  }

  handleSubmit() {
    Meteor.call('returnReact', this.state.code, (error, component) => {
      console.log(component);
      this.setState({component: component});
    });
  }

  render() {
    const { component } = this.state;
    return (
      <div className="App">
        <div className="Wrapper">
          <div className="Canvas">
            {component && React.createElement(
              component.type,
              component.props,
              component.props.children
            )}
          </div>
          <div className="Editor">
            <CodeMirror
              value={this.state.code}
              onChange={(value) => { this.setState({code: value}) }}
              options={{
                lineNumbers: true,
                smartIndent: true,
                autoFocus: true,
                mode: 'jsx',
                theme: 'tomorrow-night-eighties',
              }}/>
            <button onClick={this.handleSubmit.bind(this)}>Send</button>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
