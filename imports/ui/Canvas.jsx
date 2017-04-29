import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { States } from '../api/states';

const View = () =>
  <div className="view">VIEW</div>

class Canvas extends Component {
  render() {
    const state = this.props.state && this.props.state.transformedCode;
    let setState = (newState) => {
      Meteor.call('setState', {
        id: this.props.state._id,
        userCode: newState,
        updatedAt: Date.now(),
      });
    };

    return (
      <div
        className="Canvas"
        ref="canvas"
        style={{
          transform: `scale(${this.props.scale < 1 && this.props.scale})`,
          transformOrigin: 'center top',
        }}>
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
  scale: PropTypes.number,
};

export default createContainer(() => {
  return {
    state: States.findOne(),
  };
}, Canvas);
