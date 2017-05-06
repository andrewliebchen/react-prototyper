import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'rebass';
import trunc from 'trunc-text';

import Editor from './Editor';

import styles from '../styles/StyleEditor.css';

class StyleEditor extends Component {
  constructor(props) {
    super(props);

    const { components, style } = this.props;
    const component = style.component ? style.component : components[0]._id;
    this.state = {
      component: component,
    };
  }

  handleChange(event) {
    const component = event.target.value;
    Meteor.call('updateElement', {
      id: this.props.style._id,
      component: component,
      updatedAt: Date.now(),
      type: 'style',
    });
    this.setState({component: component});
  }

  render() {
    const options = [];
    this.props.components.map((component) => {
      options.push({
        children: trunc(component.userCode, 100),
        value: component._id,
      });
    });

    return (
      <div className={styles.StyleEditor}>
        <Select
          label="Component"
          name="component"
          value={this.state.component}
          hideLabel
          options={options}
          onChange={this.handleChange.bind(this)}/>
        <Editor
          element={this.props.style}
          component={this.state.component}
          type="style"
          noBorder
          canDelete />
      </div>
    );
  }
}

StyleEditor.propTypes = {
  style: PropTypes.object,
  components: PropTypes.array,
}

export default StyleEditor;
