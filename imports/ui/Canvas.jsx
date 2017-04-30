import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import * as ui from 'rebass';

import { States } from '../api/states';

class Canvas extends Component {
  _setState(newState) {
    Meteor.call('setState', {
      id: this.props.state._id,
      userCode: newState,
      updatedAt: Date.now(),
    });
  }

  render() {
    const { scale, preview } = this.props;
    const state = this.props.state && this.props.state.transformedCode;
    const setState = (newState) => this._setState(newState);
    const canvasScale = scale < 1 && !preview ? scale : 1;

    return (
      <div
        className="Canvas"
        style={{
          transform: `scale(${canvasScale})`,
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
  preview: PropTypes.bool,
};

export default createContainer(() => {
  return {
    state: States.findOne(),
  };
}, Canvas);
