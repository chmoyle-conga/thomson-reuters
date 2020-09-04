import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import ProductList from './product-list/view/ProductList';
import Header from './components/header/Header';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProductDetails from './product-details/view/ProductDetails';


ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <Header/>
      <div className="container">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (<Redirect to="/products" />)}
          />
          <Route 
            exact
            path="/products"
            render={() => (<ProductList/>)}
          />
          <Route 
            exact
            path="/products/:productId"
            component={ProductDetails}
          />
        </Switch>
        
      </div>
    </React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
