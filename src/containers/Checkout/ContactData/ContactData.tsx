// @ts-expect-error
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import classes from './ContactData.module.css';

interface IProps {
  history: any;
  ingredients: { [type: string]: number };
  loading: boolean;
  onOrderBurger(order: any, token: string): void;
  price: number;
  token: string;
  userId: string;
}

export interface IOrderData {
  country: string;
  deliveryMethod: string;
  email: string;
  name: string;
  postCode: string;
  street: string;
}

class ContactData extends Component<IProps> {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        touched: false,
        value: '',
        valid: false,
        validation: {
          required: true
        }
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email address'
        },
        touched: false,
        value: '',
        valid: false,
        validation: {
          isEmail: true,
          required: true
        }
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Address line 1'
        },
        touched: false,
        value: '',
        valid: false,
        validation: {
          required: true
        }
      },
      postCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your post-code'
        },
        touched: false,
        value: '',
        valid: false,
        validation: {
          minLength: 6,
          maxLength: 8,
          required: true
        }
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        touched: false,
        value: '',
        valid: false,
        validation: {
          required: true
        }
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        valid: true,
        value: 'fastest'
      }
    },
    formIsValid: false
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
    inputIdentifier: string
  ): void => {
    const updatedFormElement = updateObject(
      // @ts-expect-error can be used as key
      this.state.orderForm[inputIdentifier],
      {
        valid: this.checkValidity(
          event.target.value,
          // @ts-expect-error can be used as key
          this.state.orderForm[inputIdentifier].validation
        ),
        value: event.target.value,
        touched: true
      }
    );

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  orderHandler = async (event: any): Promise<void> => {
    // @ts-ignore
    event.preventDefault();

    const formData = {};
    for (const formElementIdentifier in this.state.orderForm) {
      // @ts-ignore
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    // best to calculate the price on the server
    const order = {
      ingredients: this.props.ingredients,
      orderData: formData,
      price: this.props.price,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  render(): JSX.Element {
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        // @ts-ignore
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => {
          return (
            <Input
              onChange={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
              key={formElement.id}
              elementConfig={formElement.config.elementConfig}
              elementType={formElement.config.elementType}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              value={formElement.config.value}
            />
          );
        })}
        <Button buttonType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state: {
  burgerBuilder: {
    ingredients: { [type: string]: number };
    totalPrice: number;
  };
  order: { loading: boolean };
  auth: { token: string; userId: string };
}) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    loading: state.order.loading,
    price: state.burgerBuilder.totalPrice,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onOrderBurger: (orderData: IOrderData, token: string) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
