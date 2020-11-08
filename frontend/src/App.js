import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './pages/ProductList';
import { NotificationProvider } from './components/useNotification';
import Notification from './components/Notification';
import CreateProduct from './pages/CreateProduct';
import UpdateProduct from './pages/UpdateProduct';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Switch>
          <Route path='/' exact>
            <ProductList/>
          </Route>
          <Route path='/create'>
            <CreateProduct />
          </Route>
          <Route path='/edit/:productId'>
            <UpdateProduct />
          </Route>
        </Switch>
      </Router>
      <Notification />
    </NotificationProvider>
  );
}

export default App;