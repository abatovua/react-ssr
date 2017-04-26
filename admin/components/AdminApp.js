import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Header from './Header';
import SideBar from './SideBar';
import CategoriesPage from './categories/Categories.page';
import CategoryDetailsPage from '../containers/categories/CategoryDetails.page';
import ProductsPage from './products/Products.page';
import ProductDetailsPage from '../containers/products/ProductDetailsPage';
import AnalyticsPage from './Analytics';


export class AdminApp extends Component {
  render() {
    return (
      <div>
        <Header/>
        <main className="content-admin">
          <SideBar />
          <div className="admin-page-wrapper">
            <Switch>
              <Route exact path="/admin/products" component={ProductsPage}/>
              <Route path="/admin/products/:id" component={ProductDetailsPage}/>
              <Route exact path="/admin/categories" component={CategoriesPage}/>
              <Route path="/admin/categories/:id" component={CategoryDetailsPage}/>
              <Route exact path="/admin/analytics" component={AnalyticsPage}/>
              <Route render={() => <Redirect to="/admin/products"/>}/>
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}
