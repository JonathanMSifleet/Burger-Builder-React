// @ts-ignore
import React from 'react';
import classes from './Button.module.css';

const button = (props: Props): JSX.Element => (
  <button
    className={[classes.Button, classes[props.buttonType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

type Props = {
  buttonType: string;
  clicked(): void;
  children: any;
};

export default button;
