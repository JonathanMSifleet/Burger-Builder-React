// @ts-ignore
import React from 'react';
import classes from './Input.module.css';

interface IProps {
  onChange?(event: any): void;
  elementConfig: {
    invalid: boolean;
    options: any;
    placeholder: string;
    type: string;
  };
  elementType: string;
  invalid?: boolean;
  label?: string;
  shouldValidate: boolean;
  touched: boolean;
  value: string;
}

const input = (props: IProps): JSX.Element => {
  let inputElement: JSX.Element;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          onChange={props.onChange}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          onChange={props.onChange}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
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
          className={inputClasses.join(' ')}
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

export default input;
