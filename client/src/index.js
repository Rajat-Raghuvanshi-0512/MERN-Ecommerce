import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux"
import store from "./Redux/store"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
    />
  </Provider>
);
