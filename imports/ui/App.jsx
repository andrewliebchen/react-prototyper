import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactWindowResizeListener from 'window-resize-listener-react';
import { Button, ButtonOutline } from 'rebass';
import HotKey from 'react-shortcut';

import { Components } from '../api/components';
import { States } from '../api/states';
import { Projects } from '../api/projects';

import Canvas from './Canvas';
import Editors from './Editors';

import styles from '../styles/Global.css';

const maxWidth = 1200;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthRatio: null,
      canvasHeight: null,
      editorsHeight: null,
      editorsTop: null,
      preview: null,
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
      editorsTop,
      settings,
      user,
    } = this.state;
    return (
      <div className="App">
        <ReactWindowResizeListener onResize={this._resizeHandler}/>
        {widthRatio < 1 &&
          <ButtonOutline
            onClick={() => this.setState({preview: !preview})}
            style={{
              position: 'fixed',
              right: 10,
              top: 10,
              zIndex: 9999,
            }}>
            Preview
          </ButtonOutline>}
        <Canvas
          components={components}
          state={state}
          scale={widthRatio}
          preview={preview}/>
        {!preview &&
          <span>
            <Editors
              components={components}
              state={state}
              canvasHeight={canvasHeight}
              maxWidth={maxWidth}
              height={editorsHeight}
              top={editorsTop}/>
            <Button
              onClick={() => {
                Meteor.call('newProject', {
                  createdAt: Date.now(),
                }, (error, success) => {
                  success && this.props.history.push(`/${success}`);
                });
              }}
              style={{
                position: 'fixed',
                bottom: 10,
                right: 10,
              }}>
              New Project
            </Button>
          </span>}

        <HotKey
          keys={['escape']}
          onKeysCoincide={() => this.setState({preview: false})}/>
      </div>
    );
  }
}


App.propTypes = {
  components: PropTypes.array,
};

// TODO: PUB/SUB!
export default createContainer(({ match }) => {
  Meteor.subscribe('project', match.params._id);
  return {
    components: Components.find().fetch(),
    state: States.findOne(),
    projects: Projects.findOne(),
  };
}, App);
