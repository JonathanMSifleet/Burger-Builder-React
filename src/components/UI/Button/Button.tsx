// @ts-ignore
import React from 'react';
import classes from './Button.module.css';

interface IProps {
  buttonType: string;
  clicked?(): void;
  children: any;
  disabled?: boolean;
}

const button = (props: IProps): JSX.Element => (
  <button
    className={[classes.Button, classes[props.buttonType]].join(' ')}
    disabled={props.disabled}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
