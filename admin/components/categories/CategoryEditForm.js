import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import ColorPicker from 'rc-color-picker';

import { renderMUITextField } from '../redux-forms-material-ui-wrappers';

class ColorPickerInput extends PureComponent {
  render() {
    const { input, meta, color, ...custom } = this.props;
    return (
      <ColorPicker
        onClose={({ color }) => input.onChange(color)}
        placement="topLeft"
        color={color}
        { ...custom }
      />
    );
  }
}

const CategoryEditForm = ({ handleSubmit, color, updateHandler, pristine }) => (
  <Paper className="admin-page-row-content">
    <form onSubmit={ handleSubmit(updateHandler) }>
      <Field
        name="name"
        component={renderMUITextField}
        muiProps={{
          id: "update-category-name",
          hintText: "Name",
          floatingLabelText: "Name",
          fullWidth: true
        }}
      />
      <Field
        name="description"
        component={renderMUITextField}
        muiProps={{
          id: "update-category-description",
          hintText: "Description",
          floatingLabelText: "Description",
          fullWidth: true
        }}
      />
      <div style={{ marginBottom: 10 }}>
        <p>Category color</p>
        <Field
          name="color"
          color={color}
          component={ColorPickerInput}
        />
      </div>
      <RaisedButton
        primary={true}
        type="submit"
        disabled={pristine}
      >Edit</RaisedButton>
    </form>
  </Paper>
);

export default reduxForm({ form: 'categoryEditForm' })(CategoryEditForm);