import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { States } from '../api/states';

class Canvas extends Component {
  render() {
    const state = this.props.state && this.props.state.transformedCode;
    return (
      <div className="Canvas">
        {this.props.state && this.props.components.map((component) =>
          <span key={component._id}>
            {eval(component.transformedCode)}
          </span>
        )}
      </div>
    );
  }
}

Canvas.propTypes = {
  components: PropTypes.array,
  state: PropTypes.object,
};

export default createContainer(() => {
  return {
    state: States.findOne(),
  };
}, Canvas);
