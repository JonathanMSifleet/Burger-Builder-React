// @ts-expect-error false-error
import React, { Component } from 'react';
import Layout from './components/Layout/Layout';

class App extends Component {
  render(): JSX.Element {
    return (
      <div>
        <Layout>
          <p>test</p>
        </Layout>
      </div>
    );
  }
}

export default App;
