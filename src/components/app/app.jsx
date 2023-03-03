import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles';
import SignInPage from '../../pages/sign-in';
import BooksPage from '../../pages/books';
import BookPage from '../../pages/book';
import CartPage from '../../pages/cart';
import NotFoundPage from '../../pages/notfound';
import PrivateComponent from '../hoc';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/signin" />
      </Route>
      <Route exact path="/signin" component={SignInPage} />
      <PrivateComponent exact path="/books" component={BooksPage} />
      <PrivateComponent exact path="/books/:id" component={BookPage} />
      <PrivateComponent exact path="/cart" component={CartPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}
export default App;
