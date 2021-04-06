// @ts-expect-error
import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Email Address'
        },
        touched: false,
        value: '',
        valid: false,
        validation: {
          isEmail: true,
          required: true
        }
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        touched: false,
        value: '',
        valid: false,
        validation: {
          minLength: 6,
          required: true
        }
      }
    }
  };

  checkValidity(
    value: string,
    rules: {
      isEmail: boolean;
      maxLength: number;
      minLength: number;
      required: any;
    }
  ): boolean {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (
    event: { target: { value: string } },
    controlName: string
  ): void => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        // @ts-expect-error can be used to index
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          // @ts-expect-error can be used to index
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  render(): JSX.Element {
    const formElementsArray = [];
    for (const key in this.state.controls) {
      formElementsArray.push({
        id: key,
        // @ts-ignore
        config: this.state.controls[key]
      });
    }

    const form = formElementsArray.map((formElement) => (
      <Input
        elementConfig={formElement.config.elementConfig}
        elementType={formElement.config.elementType}
        invalid={!formElement.config.valid}
        key={formElement.id}
        onChange={(event) => this.inputChangedHandler(event, formElement.id)}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        value={formElement.config.value}
      />
    ));

    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button buttonType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
