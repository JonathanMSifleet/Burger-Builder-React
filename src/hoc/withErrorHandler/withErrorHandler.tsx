import { AxiosInstance } from 'axios';
// @ts-ignore
import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  WrappedComponent: any,
  axios: AxiosInstance
): unknown => {
  // eslint-disable-next-line react/display-name
  return class extends Component {
    state = {
      error: null as any
    };

    componentDidMount() {
      axios.interceptors.request.use((req: any) => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        (res: any) => res,
        (error: any) => {
          this.setState({ error });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Auxiliary>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      );
    }
  };
};

export default withErrorHandler;
