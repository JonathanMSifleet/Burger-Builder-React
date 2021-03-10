// @ts-ignore
import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

class Modal extends Component<Props> {
  shouldComponentUpdate(nextProps: { show: boolean }): boolean {
    return nextProps.show !== this.props.show;
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
  modalClosed(): void;
  show: boolean;
};

export default Modal;
