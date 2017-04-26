import React, { PureComponent } from 'react';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import { red600, red800 } from 'material-ui/styles/colors';

class DeleteButton extends PureComponent {
	markToDelete = () => {
		const { markFn, id } = this.props;
		markFn(id);
	}

	render() {
		return (
			<IconButton onTouchTap={this.markToDelete}>
				<DeleteIcon color={red600} hoverColor={red800}/>
			</IconButton>
		);
	}
}

export default DeleteButton;