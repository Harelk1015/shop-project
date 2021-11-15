import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import { Provider } from 'react-redux';
import store from '../store/index';
import React from 'react';
import CartProvider from '../store/CartProvider';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Provider store={store}>
        <Layout>
          {' '}
          <Component {...pageProps}></Component>
        </Layout>
      </Provider>
    </CartProvider>
  );
}

export default MyApp;
