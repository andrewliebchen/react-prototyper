import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';

import Editor from './Editor';

import styles from '../styles/CanvasComponent';

class CanvasComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: false,
    };
  }

  _buildStyledComponent(styles, component) {
    let styledComponent;
    const componentStyle = _.find(styles, {component: component._id});

    if (componentStyle) {
      styledComponent = component.transformedCode.replace(
        'null,',
        `{style: {${componentStyle.transformedCode}}}, null,`
      );
    } else {
      styledComponent = component.transformedCode;
    }

    return eval(styledComponent);
  }

  render() {
    return (
      <span
        onClick={() => this.setState({code: true})}
        style={{position: 'relative'}}>

        {this._buildStyledComponent(
          this.props.prototypeStyles,
          this.props.component
        )}

        {this.state.code &&
          <OutsideClickHandler
            onOutsideClick={() => this.setState({code: false})}>
            <div className={styles.EditorWrapper}>
              <Editor
                type="component"
                element={this.props.component}
                canDelete/>
            </div>
          </OutsideClickHandler>}
      </span>
    );
  }
}

CanvasComponent.propTypes = {
  component: PropTypes.object,
  option: PropTypes.bool,
  prototypeStyles: PropTypes.array,
};

export default CanvasComponent;
