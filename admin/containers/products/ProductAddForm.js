import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';

import { renderMUITextField, renderMUIAutocomplete } from '../../components/redux-forms-material-ui-wrappers';

import { addProduct } from '../../actions/products.action';

import { getAutocompleteDataSource } from '../../selectors/products.selector';

class ProductAddForm extends Component {
  addProduct = ({ category, title, description, price }) => {
    this.props.addProduct({ category, title, description, price });
  }

  handleFilter = (searchText, key) => key.indexOf(searchText) !== -1

  render() {
    const {
      handleSubmit,
      dataSource,
      invalid,
      submitSucceeded,
      submitFailed
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.addProduct)}>
        <Field
          name="category"
          component={renderMUIAutocomplete}
          muiProps={{
            id: 'add-product-category',
            floatingLabelText: 'Product category',
            dataSource,
            openOnFocus: true,
            filter: this.handleFilter,
            listStyle: { maxHeight: 300, overflowY: 'auto' },
            fullWidth: true
          }}
          submitSucceeded={submitSucceeded}
          submitFailed={submitFailed}
        />
        <Field
          name="title"
          component={renderMUITextField}
          muiProps={{
            id: "add-product-title",
            hintText: "Title",
            floatingLabelText: "Title",
            fullWidth: true
          }}
        />
        <Field
          name="price"
          component={renderMUITextField}
          muiProps={{
            type: "number",
            id: "add-product-price",
            hintText: "Price",
            floatingLabelText: "Price",
            fullWidth: true
          }}
        />
        <Field
          name="description"
          component={renderMUITextField}
          muiProps={{
            id: "add-product-description",
            hintText: "Description",
            floatingLabelText: "Description",
            fullWidth: true
          }}
        />
        <RaisedButton
          primary={true}
          disabled={invalid}
          type="submit"
        >Publish</RaisedButton>
      </form>
    );
  }
}


const validate = values => {
  const errors = {};
  if (!values.category) errors.category = 'Required';
  if (!values.title) errors.title = 'Required';
  if (!values.description) errors.description = 'Required';
  if (!values.price) errors.price = 'Required';

  return errors;
};

const ReduxFormWrapped = reduxForm({
  form: 'addProduct',
  validate
})(ProductAddForm);

const stateToProps = state => ({
  dataSource: getAutocompleteDataSource(state)
});

export default connect(stateToProps, { addProduct })(ReduxFormWrapped);