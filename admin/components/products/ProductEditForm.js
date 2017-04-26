import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import { renderMUITextField, renderMUISelectField } from '../redux-forms-material-ui-wrappers';

class ProductEditForm extends PureComponent {
	render() {
		const { handleSubmit, updateHandler, pristine, editDataSet } = this.props;
		return (
			<Paper className="admin-page-row-content">
				<form onSubmit={ handleSubmit(updateHandler) }>
					<Field
						name="title"
						component={renderMUITextField}
						muiProps={{
							id: "update-product-title",
							hintText: "Title",
							floatingLabelText: "Title",
							fullWidth: true
						}}
					/>
					<Field
						name="category"
						component={renderMUISelectField}
						muiProps={{
							id: "update-product-category",
							hintText: "Category",
							floatingLabelText: "Category",
							fullWidth: true
						}}
					>
						{ editDataSet.map(set => <MenuItem key={set.value} primaryText={set.text} value={set.value}/>) }
					</Field>
					<Field
						name="description"
						component={renderMUITextField}
						muiProps={{
							id: "update-product-description",
							hintText: "Description",
							floatingLabelText: "Description",
							fullWidth: true
						}}
					/>
					<Field
						name="price"
						component={renderMUITextField}
						muiProps={{
							id: "update-product-price",
							hintText: "Price",
							floatingLabelText: "Price",
							fullWidth: true,
							type: "number"
						}}
					/>
					<RaisedButton
						primary={true}
						type="submit"
						disabled={pristine}
					>Edit</RaisedButton>
				</form>
			</Paper>
		);
	}
}

export default reduxForm({ form: 'productEditForm' })(ProductEditForm);