import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProductProvider from './context/ProductContext';
import 'antd/dist/reset.css';

ReactDOM.render(
  <ProductProvider>
    <App />
  </ProductProvider>,
  document.getElementById('root')
);
