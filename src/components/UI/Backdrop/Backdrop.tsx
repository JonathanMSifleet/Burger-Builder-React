// @ts-ignore
import React from 'react';
import classes from './Backdrop.module.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const backdrop = (props: any): JSX.Element | null =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default backdrop;
