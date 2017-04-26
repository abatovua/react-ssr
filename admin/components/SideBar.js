import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import ProductIcon from 'material-ui/svg-icons/action/shopping-cart';
import CategoryIcon from 'material-ui/svg-icons/action/list';
import AnalyticsIcon from 'material-ui/svg-icons/editor/show-chart';

class SideBar extends Component {
  render() {
    return (
      <Paper className="sidebar">
        <List>
          <ListItem
            primaryText="Products"
            containerElement={
              <NavLink to="/admin/products" activeClassName="active-route"/>
            }
            leftIcon={<ProductIcon/>}
          />
          <ListItem
            primaryText="Categories"
            containerElement={
              <NavLink to="/admin/categories" activeClassName="active-route"/>
            }
            leftIcon={<CategoryIcon/>}
          />
          <ListItem
            primaryText="Analytics"
            containerElement={
              <NavLink to="/admin/analytics" activeClassName="active-route"/>
            }
            leftIcon={<AnalyticsIcon/>}
          />
        </List>
      </Paper>
    );
  }
}

export default SideBar;