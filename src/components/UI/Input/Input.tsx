// @ts-ignore
import React from 'react';
import classes from './Input.module.css';

const input = (props: props): JSX.Element => {
  let inputElement: JSX.Element;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

type props = {
  elementConfig?: any;
  elementType?: any;
  inputtype?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  value?: string;
};

export default input;
