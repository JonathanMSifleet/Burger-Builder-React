// @ts-ignore
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    address: {
      street: '',
      postCode: ''
    },
    email: '',
    name: ''
  };

  render(): JSX.Element {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details</h4>
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
          {/* @ts-ignore */}
          <Button buttonType="Success">Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
