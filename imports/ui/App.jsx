import React, { Component } from 'react';

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
        <textarea onChange={(event) => this.setState({code: event.target.value})}/>
        <button onClick={this.handleSubmit.bind(this)}>Send</button>

        <h3>Result:</h3>
        {component && React.createElement(
          component.type,
          component.props,
          component.props.children
        )}
      </div>
    );
  }
};

export default App;
