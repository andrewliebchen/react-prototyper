import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rebass';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Editor from './Editor';

import styles from '../styles/Editors';

Tabs.setUseDefaultStyles(false);

// Want a drag handle, Canvas scroll under...

class Editors extends Component {
  handleNewComponent() {
    Meteor.call('newComponent', {
      createdAt: Date.now(),
      project: this.props.project._id,
    });
  }

  handleNewStyle() {
    Meteor.call('newStyle', {
      createdAt: Date.now(),
      project: this.props.project._id,
    });
  }

  render() {
    const {
      components,
      prototypeStyles,
      state,
      canvasHeight,
      maxWidth,
      height,
      top
    } = this.props;
    return (
      <Tabs
        className={styles.Editors}
        style={{
          top: top,
          maxWidth: maxWidth,
          minHeight: height,
        }}>
        <TabList className="EditorsHeader">
          <Tab>Components</Tab>
          <Tab>Styles</Tab>
          <Tab>State</Tab>
        </TabList>
        <TabPanel>
          {components.map((component) =>
            <Editor
              key={component._id}
              element={component}
              type="component"
              canDelete/>
          )}
          <Button
            onClick={this.handleNewComponent.bind(this)}
            style={{display: 'block', width: '100%'}}>
            New component
          </Button>
        </TabPanel>
        <TabPanel>
          {prototypeStyles.map((style) =>
            <Editor
              key={style._id}
              element={style}
              type="style"
              canDelete/>
          )}
          <Button
            onClick={this.handleNewStyle.bind(this)}
            style={{display: 'block', width: '100%'}}>
            New style
          </Button>
        </TabPanel>
        <TabPanel>
          <Editor
            element={state}
            type="state"
            noBorder/>
        </TabPanel>
      </Tabs>
    );
  }
}

Editors.propTypes = {
  components: PropTypes.array,
  prototypeStyles: PropTypes.array,
  state: PropTypes.object,
  project: PropTypes.object,
  canvasHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
};

export default Editors;
