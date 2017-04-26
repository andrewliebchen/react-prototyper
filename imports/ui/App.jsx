import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Button } from 'rebass';

import { Components } from '../api/components';

import Canvas from './Canvas';
import Editor from './Editor';

// Probably need an editor per component
class App extends Component {
  handleNewComponent() {
    Meteor.call('newComponent', {
      createdAt: Date.now(),
    });
  }

  render() {
    const { components } = this.props;
    return (
      <div className="App">
        <div className="Wrapper">
          <Canvas components={components}/>
          <div className="Editors">
            {components.map((component) =>
              <Editor
                key={component._id}
                component={component}/>
            )}
            <Button
              onClick={this.handleNewComponent}>
              New component
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  components: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    components: Components.find({}).fetch(),
  };
}, App);
