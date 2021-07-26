import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {BrowserRouter} from 'react-router-dom';

import menuItems from './files/shop/shop.json';
import shopCart, {addFood} from './files/shop/shopCart.js'

let render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App menuItems={menuItems} shopCart={shopCart.cart} addFood={addFood}/>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

export default render;