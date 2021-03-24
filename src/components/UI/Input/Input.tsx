// @ts-ignore
import React from 'react';
import classes from './Input.module.css';

const input = (props: props): JSX.Element => {
  let inputElement: JSX.Element;

  switch (props.inputtype) {
    case 'input':
      inputElement = <input {...props} />;
      break;
    case 'textarea':
      inputElement = <textarea {...props} />;
      break;
    default:
      inputElement = <input {...props} />;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

type props = {
  inputtype: string;
  label?: string;
  name: string;
  placeholder: string;
  type: string;
};

export default input;
