// @ts-ignore
import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
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

  orderHandler = async (event: Event | undefined): Promise<void> => {
    // @ts-ignore
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
    await axios.post('orders.json', order);
    this.setState({ loading: false });
    this.props.history.push('/');
  };

  render(): JSX.Element {
    let form = (
      <form>
        <Input
          inputtype="input"
          name="name"
          placeholder="Your name"
          type="text"
        />
        <Input
          inputtype="input"
          name="email"
          placeholder="Your email"
          type="email"
        />
        <Input
          inputtype="input"
          name="street"
          placeholder="Your street"
          type="text"
        />
        <Input
          inputtype="input"
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
