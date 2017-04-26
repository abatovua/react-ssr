import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import IconButton from 'material-ui/IconButton';
import DetailsIcon from 'material-ui/svg-icons/content/forward';
import { green600, green800 } from 'material-ui/styles/colors';

import CategoryBadge from '../../components/categories/CategoryBadge';
import DeleteButton from '../../components/DeleteButton';
import DeleteProductModal from './DeleteProductModal';

import { getCategoryMap } from '../../selectors/categories.selector';
import { getProductsMap, visibleProducts } from '../../selectors/products.selector';

import { markProductToDelete } from '../../actions/products.action';

class ProductsTable extends Component {

  render() {
    const { ids, products, categories, markProductToDelete } = this.props;
    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>№</TableHeaderColumn>
              <TableHeaderColumn>Product name</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>Category</TableHeaderColumn>
              <TableHeaderColumn>Details</TableHeaderColumn>
              <TableHeaderColumn>Delete</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              ids.map((id, i) => {
                const product = products[id];
                const category = categories[product.category];
                return (
                  <TableRow key={id}>
                    <TableRowColumn>{i + 1}</TableRowColumn>
                    <TableRowColumn>{product.title}</TableRowColumn>
                    <TableRowColumn>{`${product.price}$`}</TableRowColumn>
                    <TableRowColumn>
                      {
                        category ?
                          <Link to={`/admin/categories/${category._id}`} style={{ textDecoration: 'none' }}>
                            <CategoryBadge category={category}/>
                          </Link>
                          : <CategoryBadge/>
                      }

                    </TableRowColumn>
                    <TableRowColumn>
                      <Link to={`/admin/products/${id}`}>
                        <IconButton>
                          <DetailsIcon color={green600} hoverColor={green800}/>
                        </IconButton>
                      </Link>
                    </TableRowColumn>
                    <TableRowColumn>
                      <DeleteButton markFn={markProductToDelete} id={id}/>
                    </TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <DeleteProductModal/>
      </div>
    );
  }
}

const stateToProps = state => ({
  ids: visibleProducts(state),
  products: getProductsMap(state),
  categories: getCategoryMap(state)
});

export default connect(stateToProps, { markProductToDelete })(ProductsTable);