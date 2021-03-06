import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactKeymaster from 'react-keymaster';
import * as ui from 'rebass';
import * as icon from 'reline';

import CanvasComponent from './CanvasComponent';

import { States } from '../api/states';

import canvasStyles from '../styles/Canvas';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: false,
    };
  }

  _setState(newState) {
    Meteor.call('setState', {
      id: this.props.state._id,
      userCode: newState,
      updatedAt: Date.now(),
    });
  }

  render() {
    const {
      components,
      prototypeStyles,
      scale,
      preview,
      noTransition
    } = this.props;
    const state = this.props.state && this.props.state.code;
    const setState = (newState) => this._setState(newState);
    const canvasScale = scale < 1 && !preview ? scale : 1;

    return (
      <div
        className={canvasStyles.Canvas}
        style={{
          transform: `scale(${canvasScale})`,
          transition: noTransition ? 'none' : '0.1s ease-in-out',
        }}>
        {this.props.state && components.map((component) =>
          <CanvasComponent
            key={component._id}
            component={component}
            prototypeStyles={prototypeStyles}
            option={this.state.option}/>
        )}

        <ReactKeymaster
          keyName="option"
          onKeyDown={() => this.setState({option: true})}
          onKeyUp={() => this.setState({option: false})}/>
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
  styles: PropTypes.array,
};

export default Canvas;
