import React from 'react';
import ProductList from './components/ProductList';
import './App.css'

const App = () => (
  <div className="App">
    <h1>Shop Me Now</h1>
    <p>Search for the one <span className='span'>You desire!!!</span></p>
    <ProductList />
  </div>
);

export default App;
