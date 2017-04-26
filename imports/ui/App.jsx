import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Components } from '../api/components';

import Canvas from './Canvas';
import Editor from './Editor';


const App = (props) =>
  <div className="App">
    <div className="Wrapper">
      <Canvas components={props.components}/>
      <Editor components={props.components}/>
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
