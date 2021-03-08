// @ts-ignore
import React from 'react';

import classes from './Button.module.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const button = (props: any): JSX.Element => (
  <button
    className={[classes.Button, classes[props.buttonType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
