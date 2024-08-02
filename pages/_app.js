import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import store from "../redux/store";
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <StateContext>
        <Layout>
          <Toaster />
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </Provider>
  )
}

export default MyApp