import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Components } from '../api/components';
import { States } from '../api/states';

import Canvas from './Canvas';
import Editors from './Editors';

const App = (props) =>
  <div className="App">
    <div className="Wrapper">
      <Canvas
        components={props.components}
        events={props.events}/>
      <Editors
        components={props.components}
        state={props.state}
        events={props.events}/>
    </div>
  </div>

App.propTypes = {
  components: PropTypes.array,
};

export default createContainer(() => {
  return {
    components: Components.find({}).fetch(),
    state: States.findOne(),
  };
}, App);
