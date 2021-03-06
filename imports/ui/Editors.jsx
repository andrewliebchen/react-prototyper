import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'rebass';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { JsonTree } from 'react-editable-json-tree';
import HotKey from 'react-shortcut';

import Editor from './Editor';
import StyleEditor from './StyleEditor';
import Element from './Element';

import styles from '../styles/Editors';

Tabs.setUseDefaultStyles(false);

// Want a drag handle, Canvas scroll under...
class Editors extends Component {
  handleNewPage() {
    Meteor.call('newPage', {
      createdAt: Date.now(),
      project: this.props.project._id,
    });
  }

  handlePageDelete(page) {
    const pageCount = this.props.pages && this.props.pages.length;
    if (pageCount > 1 && window.confirm('Sure you want to do that?')) {
      Meteor.call('deleteElement', {
        id: page._id,
        type: 'page',
      });
    }
  }

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

  handleUpdateState(event) {
    // Move to the server?
    switch(event.type) {
      case 'UPDATE_DELTA_TYPE':
      case 'ADD_DELTA_TYPE':
        Meteor.call('updateState', {
          id: this.props.state._id,
          key: event.key,
          newValue: event.newValue,
        });
      case 'REMOVE_DELTA_TYPE':
        Meteor.call('removeState', {
          id: this.props.state._id,
          key: event.key,
          value: event.value
        });
    }
  }

  selectTab(tab) {
    this.props.history.push(`#/${tab}`);
  }

  render() {
    const {
      components,
      prototypeStyles,
      state,
      canvasHeight,
      maxWidth,
      height,
      top,
    } = this.props;

    let selectedTab = 0;
    if (this.props.history.location.hash) {
      selectedTab = this.props.history.location.hash.replace('#/', '');
    }

    return (
      <span>
        <Tabs
          className={styles.Editors}
          selectedIndex={parseInt(selectedTab)}
          onSelect={(tab) => this.selectTab(tab)}
          style={{
            top: top,
            maxWidth: maxWidth,
            minHeight: height,
          }}>
          <TabList className="EditorsHeader">
            <Tab>Pages</Tab>
            <Tab>Components</Tab>
            <Tab>Styles</Tab>
            <Tab>State</Tab>
          </TabList>
          <TabPanel>
            <div className={styles.Pages}>
              {this.props.pages.map((page) =>
                <Element
                  key={page._id}
                  handleDelete={this.handlePageDelete.bind(this, page)}
                  canDelete
                  style={{cursor: 'pointer'}}>
                  {page.name}
                </Element>
              )}
            </div>
            <Button
              onClick={this.handleNewPage.bind(this)}
              style={{display: 'block', width: '100%'}}>
              New Page
            </Button>
          </TabPanel>
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
              <StyleEditor
                components={components}
                style={style}
                key={style._id}/>
            )}
            <Button
              onClick={this.handleNewStyle.bind(this)}
              style={{display: 'block', width: '100%'}}>
              New style
            </Button>
          </TabPanel>
          <TabPanel>
              {state &&
                <JsonTree
                  data={state.code}
                  onDeltaUpdate={this.handleUpdateState.bind(this)}/>}
          </TabPanel>
        </Tabs>

        <HotKey
          keys={['control', '1']}
          simultaneous
          onKeysCoincide={this.selectTab.bind(this, 0)}/>
        <HotKey
          keys={['control', '2']}
          simultaneous
          onKeysCoincide={this.selectTab.bind(this, 1)}/>
        <HotKey
          keys={['control', '3']}
          simultaneous
          onKeysCoincide={this.selectTab.bind(this, 2)}/>

      </span>
    );
  }
}

Editors.propTypes = {
  page: PropTypes.array,
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
