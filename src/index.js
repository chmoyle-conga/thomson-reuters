import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import ProductList from './product-list/view/ProductList';
import Header from './components/header/Header';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProductDetails from './product-details/view/ProductDetails';
import { Provider } from 'react-redux'
import CartApi from './store/CartApi';
import CartDetails from './cart-details/view/CartDetails';
import { Footer } from './components/footer/Footer';
import Checkout from './checkout/view/Checkout';
import Review from './review/view/Review';
import store from './store/Store';


const App = () => {

  CartApi.refresh();

  return (
      <Fragment>
        <Header/>
        <main className="container">
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
            <Route
              exact
              path="/cart"
              component={CartDetails}
            />
            <Route
              exact
              path="/checkout"
              component={Checkout}
            />
            <Route
              exact
              path="/review"
              component={Review}
            />
          </Switch>
        </main>
        <Footer/>
      </Fragment>
  );
}

ReactDOM.render(
  <Provider store={store}>
      <HashRouter>
          <App/>
      </HashRouter>
    </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
