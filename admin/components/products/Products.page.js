import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import ProductAddForm from '../../containers/products/ProductAddForm';
import ProductTools from '../../containers/products/ProductTools';
import ProductsTable from '../../containers/products/ProductsTable';

export default class ProductsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="admin-page-content">
        <div className="admin-page-cell">
          <Paper className="admin-page-cell-content">
            <h5>Add product</h5>
            <ProductAddForm/>
          </Paper>
        </div>
        <div className="admin-page-cell">
          <Paper className="admin-page-cell-content">
            <h5>Search/Filter products</h5>
            <ProductTools/>
          </Paper>
        </div>
        <div className="admin-page-row">
          <Paper className="admin-page-row-content">
            <h5>Products</h5>
            <ProductsTable/>
          </Paper>
        </div>
      </div>
    );
  }
}