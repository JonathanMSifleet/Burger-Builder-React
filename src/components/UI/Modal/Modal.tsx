// @ts-ignore
import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

class Modal extends Component<Props> {
  shouldComponentUpdate(nextProps: Props): boolean {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  UNSAFE_componentWillUpdate(): void {
    console.log('[Modal] Will update');
  }

  render(): JSX.Element {
    return (
      <Auxiliary>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

type Props = {
  children: any;
  clicked?(): void;
  modalClosed?: () => any;
  show: boolean;
};

export default Modal;
