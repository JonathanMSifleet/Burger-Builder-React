// @ts-expect-error
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity, updateObject } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import classes from './Auth.module.css';

interface IProps {
  authRedirectPath: string;
  buildingBurger: boolean;
  error: any;
  isAuthenticated: boolean;
  loading: boolean;
  onAuth(email: string, password: string, isSignup: boolean): void;
  onSetAuthRedirectPath(): void;
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

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (
    event: { target: { value: string } },
    controlName: string
  ): void => {
    const updatedControls = updateObject(this.state.controls, {
      // @ts-expect-error can be used as key
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          // @ts-expect-error can be used as key
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
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
        // @ts-expect-error can be used as key
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
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
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
  auth: {
    authRedirectPath: string;
    error: string;
    loading: boolean;
    token: string;
  };
  burgerBuilder: { building: boolean };
}) => {
  return {
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.burgerBuilder.building,
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuth: (email: string, password: string, isSignup: boolean) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
