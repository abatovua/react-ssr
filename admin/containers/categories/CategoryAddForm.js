import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';

import { renderMUITextField } from '../../components/redux-forms-material-ui-wrappers';
import { requiredValidator } from '../../constants/required-validator';

import { addCategory } from '../../actions/categories.action';

class CategoryAddForm extends Component {

  addCategory = ({ name, description }) => {
    this.props.addCategory({ name, description });
  }

  render() {
    const { handleSubmit, invalid } = this.props;

    return (
      <form onSubmit={handleSubmit(this.addCategory)}>
        <Field
          name="name"
          component={renderMUITextField}
          muiProps={{
            id: "category-name",
            hintText: "Name",
            floatingLabelText: "Name",
            fullWidth: true
          }}
        />
        <Field
          name="description"
          component={renderMUITextField}
          muiProps={{
            id: "category-description",
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

const validate = requiredValidator(['name', 'description']);

const ReduxFormWrapped = reduxForm({
  form: 'addCategory',
  validate
})(CategoryAddForm);

export default connect(null, { addCategory })(ReduxFormWrapped);