import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Components } from '../api/components';

import Canvas from './Canvas';
import Editor from './Editor';

// Probably need an editor per component
const App = (props) =>
  <div className="App">
    <div className="Wrapper">
      <Canvas components={props.components}/>
      <div className="Editors">
        {props.components.map((component) =>
          <Editor
            key={component._id}
            component={component}/>
        )}
      </div>
    </div>
  </div>

App.propTypes = {
  components: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    components: Components.find({}).fetch(),
  };
}, App);
