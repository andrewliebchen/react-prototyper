import React from 'react';
import PropTypes from 'prop-types';
import { X, Triangle } from 'reline';
import classnames from 'classnames';

import styles from '../styles/Element.css';

const Element = (props) =>
  <div
    onClick={props.handleClick}
    className={classnames({
      [styles.Element]: true,
      [styles.ElementActive]: props.active,
    })}
    style={props.style}>
    {props.children}
    <div className={styles.ElementActions}>
      <Triangle up className={classnames({
        [styles.ElementError]: true,
        [styles.ElementErrorActive]: props.error,
      })}/>
      {props.canDelete &&
        <X
          className={styles.ElementDelete}
          onClick={props.handleDelete}/>}
    </div>
  </div>

Element.propTypes = {
  error: PropTypes.bool,
  canDelete: PropTypes.bool,
  handleDelete: PropTypes.func,
  active: PropTypes.bool,
  style: PropTypes.object,
  handleClick: PropTypes.func,
};

export default Element;
