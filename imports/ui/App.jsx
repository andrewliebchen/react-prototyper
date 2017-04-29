import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactWindowResizeListener from 'window-resize-listener-react';

import { Components } from '../api/components';
import { States } from '../api/states';

import Canvas from './Canvas';
import Editors from './Editors';

const maxWidth = 1200;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthRatio: null,
      canvasHeight: null,
    };
  }

  _resizeHandler() {
    console.log('resize');
    let viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    let widthRatio = maxWidth / viewport.width;
    this.setState({
      widthRatio: widthRatio,
      canvasHeight: viewport.height * widthRatio,
    });
    this._resizeHandler = this._resizeHandler.bind(this);
  }

  componentWillMount() {
    this._resizeHandler();
  }

  render() {
    const { components, state } = this.props;
    const { widthRatio, canvasHeight } = this.state;
    return (
      <div className="App">
        <ReactWindowResizeListener onResize={this._resizeHandler}/>
        <Canvas
          components={components}
          scale={widthRatio}/>
        <Editors
          components={components}
          state={state}
          canvasHeight={canvasHeight}
          maxWidth={maxWidth}/>
      </div>
    );
  }
}


App.propTypes = {
  components: PropTypes.array,
};

export default createContainer(() => {
  return {
    components: Components.find({}).fetch(),
    state: States.findOne(),
  };
}, App);
