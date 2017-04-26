import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { red700, deepPurple100 } from 'material-ui/styles/colors';

import { discardCategoryToDelete, deleteCategory } from '../../actions/categories.action';

import { markedCategory } from '../../selectors/categories.selector';

class CategoryDescription extends PureComponent {
	render() {
		const { category } = this.props;
		return (
			<div>
				<h5>Delete category permanently?</h5>
				<p>Category name: {category.name}</p>
				<p>Category description: {category.description}</p>
			</div>
		);
	}
}

class DeleteCategoryModal extends Component {
	constructor(props) {
		super(props);
	}

	deleteCategory = () => {
		const { _id } = this.props.category;
		this.props.deleteCategory(_id);
	}

	render() {
		const { open, category, discardCategoryToDelete } = this.props;

		const actions = [
			<FlatButton
				label="Cancel"
				backgroundColor={deepPurple100}
				onTouchTap={discardCategoryToDelete}
			/>,
			<FlatButton
				label="Delete"
				backgroundColor={red700}
				onTouchTap={this.deleteCategory}
			/>,
		];

		return (
			<Dialog
				open={open}
				actions={actions}
				title="Category deletion"
			>
				{ category ? <CategoryDescription category={category}/> : null }
			</Dialog>
		);
	}
}

const stateToProps = state => ({
	category: markedCategory(state),
	open: !!state.categories.markedForDeletion
});

export default connect(stateToProps, { discardCategoryToDelete, deleteCategory })(DeleteCategoryModal);