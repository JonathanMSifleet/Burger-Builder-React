// @ts-ignore
import React from 'react';
import classes from './Button.module.css';

const button = (props: Props): JSX.Element => (
  <button
    className={[classes.Button, classes[props.buttonType]].join(' ')}
    disabled={props.disabled}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

type Props = {
  buttonType: string;
  clicked?(): void;
  children: any;
  disabled?: boolean;
};

export default button;
