import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

import { changeCategoriesOrder, findCategories } from '../../actions/categories.action';

import { getOrderBy, getQuery } from '../../selectors/categories.selector';


class CategoryTools extends Component {
  state = {}

  componentWillMount() {
    this.setState({
      query: this.props.query
    });
  }

  handleOrderChange = (event, index, value) => {
    this.props.changeCategoriesOrder(value);
  }

  handleSearchChange = (event, query) => {
    this.props.findCategories(query);
    this.setState({ query });
  }

  render() {
    const { orderBy } = this.props;
    return (
      <div>
        <SelectField
          fullWidth={true}
          value={orderBy}
          floatingLabelText="Order by"
          id="orderBy"
          onChange={this.handleOrderChange}
        >
          <MenuItem value="name" primaryText="Name"/>
          <MenuItem value="name-reverse" primaryText="Name reverse"/>
        </SelectField>
        <TextField
          hintText="Search"
          value={this.state.query}
          floatingLabelText="Search categories"
          id="search-category"
          onChange={this.handleSearchChange}
          fullWidth={true}
        />
      </div>
    );
  }
}

const stateToProps = state => ({
  orderBy: getOrderBy(state),
  query: getQuery(state)
});

export default connect(stateToProps, { changeCategoriesOrder, findCategories })(CategoryTools);