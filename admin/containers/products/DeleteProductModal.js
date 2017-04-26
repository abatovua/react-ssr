import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { red700, deepPurple100 } from 'material-ui/styles/colors';

import { discardProductToDelete, deleteProduct } from '../../actions/products.action';

import { markedProduct } from '../../selectors/products.selector';

import CategoryBadge from '../../components/categories/CategoryBadge';

class ProductDescription extends PureComponent {
  render() {
    const { product, category } = this.props;
    return (
      <div>
        <h5>Delete product permanently?</h5>
        <div>Product name: {product.title}</div>
        <div>Product description: {product.description}</div>
        <div>Product category: <CategoryBadge category={category} inline={true}/></div>
      </div>
    );
  }
}

class DeleteProductModal extends Component {
  deleteProduct = () => {
    const { _id } = this.props.product;
    this.props.deleteProduct(_id);
  }

  render() {
    const { open, category, product, discardProductToDelete } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        backgroundColor={deepPurple100}
        onTouchTap={discardProductToDelete}
      />,
      <FlatButton
        label="Delete"
        backgroundColor={red700}
        onTouchTap={this.deleteProduct}
      />,
    ];

    return (
      <Dialog
        open={open}
        actions={actions}
        title="Product deletion"
      >
        { product ? <ProductDescription product={product} category={category}/> : null }
      </Dialog>
    );
  }
}

const stateToProps = state => {
  const product = markedProduct(state);
  const category = product ? state.categories.data[product.category] : null;
  return {
    product,
    category,
    open: !!state.products.markedForDeletion
  }
};

export default connect(stateToProps, { discardProductToDelete, deleteProduct })(DeleteProductModal);