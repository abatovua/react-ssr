import React, { PureComponent } from 'react';
import Paper from 'material-ui/Paper';
import { grey400, fullWhite } from 'material-ui/styles/colors';

class CategoryBadge extends PureComponent {
  render() {
    const { category, inline } = this.props;

    const style = {
      backgroundColor: category ? category.color : grey400,
      padding: '5px 5px',
      textAlign: 'center',
      color: fullWhite,
      display: inline ? 'inline-block' : 'block'
    };

    return (
      <Paper zDepth={1} style={style}>
        { category ? category.name : 'uncategorized' }
      </Paper>
    );
  }
}

CategoryBadge.defaultProps = {
  inline: false
};

export default CategoryBadge;