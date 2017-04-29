import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactWindowResizeListener from 'window-resize-listener-react';
import { ButtonOutline } from 'rebass';

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
      editorsHeight: null,
      editorsTop: null,
      preview: false,
    };
  }

  _resizeHandler() {
    let viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    let widthRatio = maxWidth / viewport.width;
    let canvasHeight = viewport.height * widthRatio;
    this.setState({
      widthRatio: widthRatio,
      canvasHeight: canvasHeight,
      editorsTop: canvasHeight > viewport.height ? viewport.height : canvasHeight,
      editorsHeight: viewport.height - canvasHeight,
    });
    this._resizeHandler = this._resizeHandler.bind(this);
  }

  componentWillMount() {
    this._resizeHandler();
  }

  render() {
    const { components, state } = this.props;
    const {
      widthRatio,
      canvasHeight,
      preview,
      editorsHeight,
      editorsTop
    } = this.state;
    return (
      <div className="App">
        <ReactWindowResizeListener onResize={this._resizeHandler}/>
        {widthRatio < 1 &&
          <ButtonOutline
            onClick={() => this.setState({preview: !preview})}
            style={{
              position: 'fixed',
              right: 3,
              top: 3,
              zIndex: 9999,
            }}>
            Preview
          </ButtonOutline>}
        <Canvas
          components={components}
          scale={widthRatio}
          preview={preview}/>
        {!this.state.preview &&
          <Editors
            components={components}
            state={state}
            canvasHeight={canvasHeight}
            maxWidth={maxWidth}
            height={editorsHeight}
            top={editorsTop}/>}
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
