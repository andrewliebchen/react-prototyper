import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactWindowResizeListener from 'window-resize-listener-react';
import HotKey from 'react-shortcut';
import { Overlay } from 'rebass';
import Draggable from 'react-draggable';
import classnames from 'classnames';

import { Pages } from '../api/pages';
import { Components } from '../api/components';
import { Styles } from '../api/styles';
import { States } from '../api/states';
import { Projects } from '../api/projects';

import Nav from './Nav';
import Canvas from './Canvas';
import Editors from './Editors';
import Handle from './Handle';

import styles from '../styles/App.css';

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
      user: false,
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
    const {
      widthRatio,
      canvasHeight,
      preview,
      editorsHeight,
      editorsTop,
      user,
    } = this.state;
    return (
      <div className="App">
        <ReactWindowResizeListener onResize={this._resizeHandler}/>
        <Overlay
          box
          open={user}
          onDismiss={() => this.setState({user: false})}>
          User info!
        </Overlay>
        <Nav
          showPreviewToggle={widthRatio < 1}
          togglePreview={() => this.setState({preview: !preview})}
          toggleUser={() => this.setState({user: !user})}
          newProject={() => {
            Meteor.call('newProject', {
              createdAt: Date.now(),
            }, (error, success) => {
              success && this.props.history.push(`/${success}`);
            });
          }}/>

        <Canvas
          scale={widthRatio}
          preview={preview}
          {...this.props}/>

        {!preview &&
          <Draggable
            axis="y"
            handle="#handle"
            onDrag={(e) => this.setState({
              editorsTop: e.clientY < canvasHeight ? e.clientY : editorsTop,
              editorsHeight: window.innerHeight - e.clientY - 10.5, // 10.5 is the height of the handle
            })}>
            <span>
              {!preview &&
                <Handle
                  top={editorsTop}
                  maxWidth={maxWidth}/>}
              <Editors
                height={editorsHeight}
                top={editorsTop}
                maxWidth={maxWidth}
                {...this.props}/>
            </span>
          </Draggable>}

        <HotKey
          keys={['escape']}
          onKeysCoincide={() => this.setState({preview: false})}/>
      </div>
    );
  }
}


App.propTypes = {
  pages: PropTypes.array,
  components: PropTypes.array,
  prototypeStyles: PropTypes.array,
  state: PropTypes.object,
  project: PropTypes.object,
};

export default createContainer(({ match }) => {
  Meteor.subscribe('project', match.params._id);
  return {
    pages: Pages.find().fetch(),
    components: Components.find().fetch(),
    prototypeStyles: Styles.find().fetch(),
    state: States.findOne(),
    project: Projects.findOne(),
    styles: Styles.find().fetch()
  };
}, App);
