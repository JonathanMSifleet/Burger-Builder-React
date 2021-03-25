// @ts-ignore
import React from 'react';
import classes from './Backdrop.module.css';

interface IProps {
  clicked?(): void;
  show: boolean;
}

const backdrop = (props: IProps): JSX.Element | null =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default backdrop;
