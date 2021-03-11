// @ts-ignore
import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props: Props): JSX.Element | null =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

type Props = {
  clicked?(): void;
  show: boolean;
};

export default backdrop;
