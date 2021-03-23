import axios from 'axios';
// @ts-ignore
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component<IProps> {
  state = {
    address: {
      street: '',
      postCode: ''
    },
    email: '',
    loading: false,
    name: ''
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  orderHandler = async (event: any) => {
    event.preventDefault();
    this.setState({ loading: true });
    // .json required for Firebase
    // best to calculate the price on the server
    const order = {
      customer: {
        address: {
          postCode: 'qwerty',
          street: 'Test',
          country: 'UK'
        },
        email: 'test@gmail.com',
        name: 'Jon'
      },
      ingredients: this.props.ingredients,
      price: this.props.price
    };
    await axios.post(
      'https://react-project-776bc-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
      order
    );
    this.setState({ loading: false });
    this.props.history.push('/');
  };

  render(): JSX.Element {
    let form = (
      <form>
        <input
          className={classes.Input}
          name="name"
          placeholder="Your name"
          type="text"
        />
        <input
          className={classes.Input}
          name="email"
          placeholder="Your email"
          type="email"
        />
        <input
          className={classes.Input}
          name="street"
          placeholder="Your street"
          type="text"
        />
        <input
          className={classes.Input}
          name="postCode"
          placeholder="Your post-code"
          type="text"
        />
        <Button buttonType="Success" clicked={() => this.orderHandler(event)}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
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

interface IProps {
  history: any;
  ingredients: { [type: string]: number };
  price: number;
}

export default ContactData;
