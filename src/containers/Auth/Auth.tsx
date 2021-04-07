// @ts-expect-error
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import classes from './Auth.module.css';

interface IProps {
  error: any;
  isAuthenticated: boolean;
  loading: boolean;
  onAuth(email: string, password: string, isSignup: boolean): void;
}

class Auth extends Component<IProps> {
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
    },
    isSignup: true
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

  submitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState: any) => {
      return {
        isSignup: !prevState.isSignup
      };
    });
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

    let form = formElementsArray.map((formElement) => (
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
    )) as JSX.Element | JSX.Element[];

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null as JSX.Element | null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button buttonType="Success">Submit</Button>
          <Button buttonType="Danger" clicked={this.switchAuthModeHandler}>
            Switch to {this.state.isSignup ? 'sign in' : 'sign up'}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: {
  auth: { error: string; loading: boolean; token: string };
}) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuth: (email: string, password: string, isSignup: boolean) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
