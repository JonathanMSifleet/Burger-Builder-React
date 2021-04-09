import { AxiosInstance } from 'axios';
// @ts-expect-error react required
import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  WrappedComponent: any,
  axios: AxiosInstance
): any => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const [error, setError] = useState(null as any);

    const reqInterceptor = axios.interceptors.request.use((req: any) => {
      setError(null);
      return req;
    });
    const resInterceptor = axios.interceptors.response.use(
      (res: any) => res,
      (error: any) => {
        setError(error);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Auxiliary>
        <Modal modalClosed={errorConfirmedHandler} show={error}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Auxiliary>
    );
  };
};

export default withErrorHandler;
