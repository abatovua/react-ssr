import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DetailsIcon from 'material-ui/svg-icons/content/forward';
import { green600, green800 } from 'material-ui/styles/colors';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DeleteButton from '../../components/DeleteButton';
import DeleteCategoryModal from './DeleteCategoryModal';

import { markCategoryToDelete } from '../../actions/categories.action';

import { visibleCategories, getCategoryMap } from '../../selectors/categories.selector';

class CategoriesTable extends Component {
	render() {
		const { ids, categories, markCategoryToDelete } = this.props;

		return (
			<div>
				<Table selectable={false}>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn>№</TableHeaderColumn>
							<TableHeaderColumn>Category name</TableHeaderColumn>
							<TableHeaderColumn>Details</TableHeaderColumn>
							<TableHeaderColumn>Delete</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{
							ids.map((id, i) => (
								<TableRow key={id}>
									<TableRowColumn>{i + 1}</TableRowColumn>
									<TableRowColumn>{categories[id].name}</TableRowColumn>
									<TableRowColumn>
										<Link to={`/admin/categories/${id}`}>
											<IconButton>
												<DetailsIcon color={green600} hoverColor={green800}/>
											</IconButton>
										</Link>
									</TableRowColumn>
									<TableRowColumn>
										<DeleteButton markFn={markCategoryToDelete} id={id}/>
									</TableRowColumn>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
				<DeleteCategoryModal/>
			</div>
		);
	}
}

const stateToProps = state => ({
	ids: visibleCategories(state),
	categories: getCategoryMap(state)
});

export default connect(stateToProps, { markCategoryToDelete })(CategoriesTable);