import React, { Component } from 'react';
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';

import { getAutocompleteDataSource, getProductsQuery, getCurrentFilterName } from '../../selectors/products.selector';

import { changeProductsFilter, searchProducts } from '../../actions/products.action';

class ProductTools extends Component {
  componentWillMount() {
    this.setState({
      productQuery: this.props.query,
      categoryQuery: this.props.filterDisplayName
    });
  }

  state = {
    categoryQuery: '',
    productQuery: ''
  }

  autoCompleteStyle = {
    maxHeight: 300, overflowY: 'auto'
  }

  handleCategoryInputChange = searchText => {
    this.setState({ categoryQuery: searchText });
  }

  handleRequest = (chosenRequest, index) => {
    const { changeProductsFilter } = this.props;

    if (index === -1) {
      changeProductsFilter('all');
      this.setState({ categoryQuery: '' });
      return;
    }

    changeProductsFilter(chosenRequest.value);
    this.setState({ categoryQuery: chosenRequest.text });
  }

  handleFocus = () => {
    this.setState({ categoryQuery: '' });
  }

  handleClose = () => {
    const { categoryQuery } = this.state;
    const { changeProductsFilter } = this.props;

    if (!categoryQuery) {
      changeProductsFilter('all');
      this.setState({ chosenRequest: null, categoryQuery: '' });
      return;
    }
  }

  handleFilter = (searchText, key) => key.indexOf(searchText) !== -1

  handleProductSearchChange = (event, query) => {
    this.props.searchProducts(query);
    this.setState({ productQuery: query });
  }

  render() {
    const { dataSource } = this.props;
    return (
      <div>
        <AutoComplete
          onUpdateInput={this.handleCategoryInputChange}
          onNewRequest={this.handleRequest}
          onClose={this.handleClose}
          onFocus={this.handleFocus}
          filter={this.handleFilter}
          searchText={this.state.categoryQuery}
          hintText="Filter by category"
          floatingLabelText="Filter by category"
          dataSource={dataSource}
          openOnFocus={true}
          id="filter-product"
          listStyle={this.autoCompleteStyle}
          fullWidth={true}
        />
        <TextField
          hintText="Search"
          floatingLabelText="Search categories"
          id="search-product"
          fullWidth={true}
          onChange={this.handleProductSearchChange}
          value={this.state.productQuery}
        />
      </div>
    );
  }
}

const stateToProps = state => ({
  dataSource: getAutocompleteDataSource(state),
  query: getProductsQuery(state),
  filterDisplayName: getCurrentFilterName(state)
});

export default connect(stateToProps, { changeProductsFilter, searchProducts })(ProductTools);