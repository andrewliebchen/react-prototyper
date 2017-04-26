import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rebass';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Editor from './Editor';

Tabs.setUseDefaultStyles(false);

class Editors extends Component {
  handleNewComponent() {
    Meteor.call('newComponent', {
      createdAt: Date.now(),
    });
  }

  render() {
    const { components } = this.props;
    return (
      <Tabs className="Editors">
        <TabList className="EditorsHeader">
          <Tab>Components</Tab>
          <Tab>Events</Tab>
          <Tab>Views</Tab>
          <Tab>State</Tab>
          <Tab>Styles</Tab>
        </TabList>
        <TabPanel>
          {components.map((component) =>
            <Editor
              key={component._id}
              element={component}/>
          )}
          <Button
            onClick={this.handleNewComponent}>
            New component
          </Button>
        </TabPanel>
        <TabPanel>Events</TabPanel>
        <TabPanel>Views</TabPanel>
        <TabPanel>State</TabPanel>
        <TabPanel>Styles</TabPanel>
      </Tabs>
    );
  }
}

Editors.propTypes = {
  components: PropTypes.array.isRequired,
};

export default Editors;
