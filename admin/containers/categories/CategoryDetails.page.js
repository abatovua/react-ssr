import React, { Component, PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import { green600 } from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';

import CategoryEditForm from '../../components/categories/CategoryEditForm';

import { updateCategory } from '../../actions/categories.action';

import { getCategory } from '../../selectors/categories.selector';

class Details extends PureComponent {
  render() {
    const { category } = this.props;
    return (
      <Paper>
        <List>
          <Subheader>Category name</Subheader>
          <ListItem
            disabled={true}
            children={category.name}
          />
          <Subheader>Description</Subheader>
          <ListItem
            disabled={true}
            children={category.description}
          />
          <Subheader>Color</Subheader>
          <ListItem
            disabled={true}
          >
            <div className="category-color" style={{ backgroundColor: category.color }}></div>
          </ListItem>
        </List>
      </Paper>
    );
  }
}

class CategoryDetailsPage extends Component {
  state = { editMode: false };

  componentWillReceiveProps(nextProps) {
    if (this.props.category !== nextProps.category) {
      this.toggleMode();
    }
  }

  toggleMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  updateHandler = data => {
    const { id } = this.props.match.params;
    this.props.updateCategory(id, data);
  }

  render() {
    const { category, color } = this.props;
    const { editMode } = this.state;

    if (!category) {
      return <Redirect to="/admin/categories"/>
    }

    return (
      <div className="admin-page-content">
        <div className="admin-page-row">
          <Card className="admin-page-row-content">
            <CardHeader
              title="Category details"
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
              {
                editMode ?
                  <CategoryEditForm
                    initialValues={{
                      name: category.name,
                      description: category.description,
                      color: category.color
                    }}
                    color={color}
                    updateHandler={this.updateHandler}
                  />
                  : <Details category={category}/>
              }
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

const colorSelector = formValueSelector('categoryEditForm');

const stateToProps = (state, props) => ({
  category: getCategory(state, props.match.params.id),
  color: colorSelector(state, 'color')
});


export default connect(stateToProps, { updateCategory })(CategoryDetailsPage);