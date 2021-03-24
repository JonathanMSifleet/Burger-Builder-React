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
          onChange={props.onChange}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={classes.InputElement}
          onChange={props.onChange}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={classes.InputElement}
          onChange={props.onChange}
          value={props.value}
        >
          {props.elementConfig.options.map(
            (option: { value: string; displayValue: string }) => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            )
          )}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          onChange={props.onChange}
          value={props.value}
          {...props.elementConfig}
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
  onChange?(event: any): void;
  elementConfig: {
    options: any;
    placeholder: string;
    type: string;
  };
  elementType: string;
  label?: string;
  value: string;
};

export default input;
