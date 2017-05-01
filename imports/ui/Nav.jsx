import React from 'react';
import PropTypes from 'prop-types';
import { Plus, Square, Burger } from 'reline';

import styles from '../styles/Nav.css';

const NavItem = (props) =>
  <div
    className={styles.NavItem}
    onClick={props.clickHandler}>
    {props.children}
  </div>

const Nav = (props) =>
  <div className={styles.Nav}>
    {props.showPreviewToggle &&
      <NavItem clickHandler={props.togglePreview}>
        <Square size={20}/>
      </NavItem>}
      <NavItem clickHandler={props.newProject}>
        <Plus size={20}/>
      </NavItem>
      <NavItem>
        <Burger size={20}/>
      </NavItem>
  </div>

Nav.propTypes = {
  showPreviewToggle: PropTypes.bool,
  togglePreview: PropTypes.func,
  newProject: PropTypes.func,
}

export default Nav;
