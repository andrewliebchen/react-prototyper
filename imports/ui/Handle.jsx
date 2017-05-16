import React from 'react';
import PropTypes from 'prop-types';
import { Minus } from 'reline';

import styles from '../styles/Handle.css';

const Handle = (props) =>
  <div
    id="handle"
    className={styles.Handle}
    style={{
      top: props.top,
      maxWidth: props.maxWidth,
      marginLeft: -props.maxWidth * 0.5,
    }}>
    <Minus className={styles.HandleGrip}/>
  </div>

Handle.propTypes = {
  top: PropTypes.number,
  maxWidth: PropTypes.number,
};

export default Handle;
