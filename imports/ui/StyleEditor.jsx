import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'rebass';
import { Flex, Box } from 'reflexbox';
import { Plus, Minus } from 'reline';
import trunc from 'trunc-text';

import Editor from './Editor';

import styles from '../styles/StyleEditor.css';

const StyleEditor = (props) => {
  const options = [];
  props.components.map((component) => {
    options.push({
      children: trunc(component.userCode, 100),
      value: component._id,
    });
  });

  return (
    <div className={styles.StyleEditor}>
      <Flex
        className={styles.ComponentChooser}>
        <Box flexAuto>
          <Select
            label="Component"
            name="component"
            hideLabel
            options={options}
            style={{marginBottom: 0}}
            onChange={(event) => {
              console.log(event.target.value);
              Meteor.call('updateStyleComponent', {
                id: props.style._id,
                component: event.target.value,
                updatedAt: Date.now(),
              });
            }}/>
        </Box>
        <Box ml={1} className={styles.Action}>
          <Plus/>
        </Box>
        <Box ml={1} className={styles.Action}>
          <Minus/>
        </Box>
      </Flex>

      {console.log(props.style.component)}

      <Editor
        element={props.style}
        component={props.style.component}
        type="style"
        canDelete />
    </div>
  );
};

StyleEditor.propTypes = {
  style: PropTypes.object,
  components: PropTypes.array,
}

export default StyleEditor;
