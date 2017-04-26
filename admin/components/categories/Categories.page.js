import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import CategoryAddForm from '../../containers/categories/CategoryAddForm';
import CategoriesTable from '../../containers/categories/CategoriesTable';
import CategoryTools from '../../containers/categories/CategoryTools';

class CategoriesPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="admin-page-content">
				<div className="admin-page-cell">
					<Paper className="admin-page-cell-content">
						<h5>Add category</h5>
						<CategoryAddForm/>
					</Paper>
				</div>
				<div className="admin-page-cell">
					<Paper className="admin-page-cell-content">
						<h5>Search/Filter categories</h5>
						<CategoryTools/>
					</Paper>
				</div>
				<div className="admin-page-row">
					<Paper className="admin-page-row-content">
						<CategoriesTable/>
					</Paper>
				</div>
			</div>
		);
	}
}

export default CategoriesPage;