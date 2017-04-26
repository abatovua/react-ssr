import React, { Component, PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import { green600 } from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';

import CategoryBadge from '../../components/categories/CategoryBadge';
import ProductEditForm from '../../components/products/ProductEditForm';

import { getCategoryMap, getSelectFieldDataSet } from '../../selectors/categories.selector';
import { getProduct } from '../../selectors/products.selector';

import { updateProduct } from '../../actions/products.action';

class ProductCard extends PureComponent {
	render() {
		const { product, category } = this.props;
		return (
			<Paper>
				<List>
					<Subheader>Product title</Subheader>
					<ListItem
						disabled={true}
						children={product.title}
					/>
					<Subheader>Product category</Subheader>
					<ListItem
						disabled={true}
					>
						<CategoryBadge category={category} inline={true}/>
					</ListItem>
					<Subheader>Description</Subheader>
					<ListItem
						disabled={true}
						children={product.description}
					/>
					<Subheader>Price</Subheader>
					<ListItem
						disabled={true}
						children={`${product.price} $`}
					/>
				</List>
			</Paper>
		);
	}
}

class ProductDetailsPage extends Component {
	state = { editMode: false }

	componentWillReceiveProps(nextProps) {
		if (this.props.product !== nextProps.product) {
			this.toggleMode();
		}
	}

	toggleMode = () => {
		this.setState({ editMode: !this.state.editMode });
	}

	updateHandler = data => {
		const { id } = this.props.match.params;
		this.props.updateProduct(id, data);
	}

	render() {
		const { product, category, editDataSet } = this.props;
		const { editMode } = this.state;

		if(!product) {
			return <Redirect to="/admin/products"/>
		}

		return (
			<div className="admin-page-content">
				<div className="admin-page-row">
					<Card className="admin-page-row-content">
						<CardHeader
							title="Product details"
						/>
						<CardActions>
							<FloatingActionButton
								backgroundColor={green600}
								onTouchTap={this.toggleMode}
							>
								{ editMode ? <UndoIcon/> : <EditIcon/> }
							</FloatingActionButton>
						</CardActions>
						<CardText>
							{ editMode ?
								<ProductEditForm
									initialValues={{
										title: product.title,
										category: category ? category._id : '',
										description: product.description,
										price: product.price
									}}
									editDataSet={editDataSet}
									updateHandler={this.updateHandler}
								/> :
								<ProductCard
									product={product}
									category={category}
								/>
							}
						</CardText>
					</Card>
				</div>
			</div>
		);
	}
}

const stateToProps = (state, props) => {
	const product = getProduct(state, props.match.params.id);
	const category = product ? getCategoryMap(state)[product.category] : null;
	return {
		product,
		category,
		editDataSet: getSelectFieldDataSet(state)
	}
};

export default connect(stateToProps, { updateProduct })(ProductDetailsPage);