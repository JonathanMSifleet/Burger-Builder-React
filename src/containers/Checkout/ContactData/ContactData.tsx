import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { checkValidity, updateObject } from '../../../shared/utility';
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

const contactData: React.FC<IProps> = ({
  ingredients,
  loading,
  onOrderBurger,
  price,
  token,
  userId
}) => {
  const [orderForm, setOrderForm] = useState({
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
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    // @ts-ignore
    event.preventDefault();

    const formData = {};
    for (const formElementIdentifier in orderForm) {
      // @ts-ignore
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    // best to calculate the price on the server
    const order = {
      ingredients,
      orderData: formData,
      price: price,
      userId: userId
    };

    onOrderBurger(order, token);
  };

  const inputChangedHandler = (
    event: { target: { value: string } },
    inputIdentifier: string
  ): void => {
    const updatedFormElement = updateObject(
      // @ts-expect-error can be used as key
      orderForm[inputIdentifier],
      {
        valid: checkValidity(
          event.target.value,
          // @ts-expect-error can be used as key
          orderForm[inputIdentifier].validation
        ),
        value: event.target.value,
        touched: true
      }
    );

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (const key in orderForm) {
    formElementsArray.push({
      id: key,
      // @ts-expect-error can use key
      config: orderForm[key]
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => {
        return (
          <Input
            onChange={(event) => inputChangedHandler(event, formElement.id)}
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
      <Button buttonType="Success" disabled={!formIsValid}>
        Order
      </Button>
    </form>
  );
  if (loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact details</h4>
      {form}
    </div>
  );
};

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
)(withErrorHandler(contactData, axios));
