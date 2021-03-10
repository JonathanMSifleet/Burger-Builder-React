// @ts-ignore
import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props: Props): JSX.Element => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      disabled={props.disabled}
      onClick={props.removed}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.added}>
      More
    </button>
  </div>
);

type Props = {
  added(): void;
  disabled: boolean;
  label: string;
  removed(): void;
};

export default buildControl;
