import React, { Component } from 'react';

import Canvas from './Canvas';
import Editor from './Editor';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      component: null,
    };
  }

  handleUpdate(value) {
    this.setState({code: value});
  }

  handleSubmit() {
    Meteor.call('returnReact', this.state.code, (error, component) => {
      this.setState({component: component});
    });
  }

  render() {
    const { component } = this.state;
    return (
      <div className="App">
        <div className="Wrapper">
          <Canvas component={this.state.component}/>
          <Editor
            code={this.state.code}
            handleUpdate={this.handleUpdate.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}/>
        </div>
      </div>
    );
  }
};

export default App;
