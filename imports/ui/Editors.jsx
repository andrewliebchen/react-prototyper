import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rebass';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Editor from './Editor';

Tabs.setUseDefaultStyles(false);

// Want a drag handle, Canvas scroll under...

class Editors extends Component {
  handleNewComponent() {
    Meteor.call('newComponent', {
      createdAt: Date.now(),
    });
  }

  render() {
    const {
      components,
      state,
      canvasHeight,
      maxWidth,
      height,
      top
    } = this.props;
    return (
      <Tabs
        className="Editors"
        style={{
          top: top,
          maxWidth: maxWidth,
          minHeight: height,
        }}>
        <TabList className="EditorsHeader">
          <Tab>Components</Tab>
          <Tab>State</Tab>
          <Tab>Options</Tab>
          <Tab style={{margin: '0 0 0 auto'}}>Andrew</Tab>
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
            onClick={this.handleNewComponent}
            style={{
              display: 'block',
              width: '100%'
            }}>
            New component
          </Button>
        </TabPanel>
        <TabPanel>
          <Editor
            element={state}
            type="state"
            noBorder/>
        </TabPanel>
        <TabPanel>Settings</TabPanel>
        <TabPanel>Andrew</TabPanel>
      </Tabs>
    );
  }
}

Editors.propTypes = {
  components: PropTypes.array,
  state: PropTypes.object,
  canvasHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
};

export default Editors;
