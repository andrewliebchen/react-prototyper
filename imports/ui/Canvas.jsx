import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import * as ui from 'rebass';
import * as icon from 'reline';

import { States } from '../api/states';

import canvasStyles from '../styles/Canvas';

class Canvas extends Component {
  _setState(newState) {
    Meteor.call('setState', {
      id: this.props.state._id,
      userCode: newState,
      updatedAt: Date.now(),
    });
  }

  render() {
    const { prototypeStyles, scale, preview, noTransition } = this.props;
    const styles = [];
    const state = this.props.state && this.props.state.code;
    const setState = (newState) => this._setState(newState);
    const canvasScale = scale < 1 && !preview ? scale : 1;

    // Need a key/value pair for component...option dropdown in styles editor?
    // prototypeStyles.map((style) => {
    //   styles.push(style.transformedCode);
    // });

    return (
      <div
        className={canvasStyles.Canvas}
        style={{
          transform: `scale(${canvasScale})`,
          transition: noTransition ? 'none' : '0.1s ease-in-out',
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
  prototypeStyles: PropTypes.array,
  state: PropTypes.object,
  scale: PropTypes.number,
  preview: PropTypes.bool,
  noTransition: PropTypes.bool,
};

export default Canvas;
