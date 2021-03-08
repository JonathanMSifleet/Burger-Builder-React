// @ts-ignore
import React from 'react';

import classes from './Modal.module.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const modal = (props: any) => (
  <div
    className={classes.Modal}
    style={{
      transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.show ? '1' : '0'
    }}
  >
    {props.children}
  </div>
);

export default modal;
