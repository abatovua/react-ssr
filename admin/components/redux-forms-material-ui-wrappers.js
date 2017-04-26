import React, { Component, PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import AutoComplete from 'material-ui/AutoComplete';

export class renderMUITextField extends PureComponent {
	render() {
		const { input, muiProps, meta: { touched, error } } = this.props;
		return (
			<TextField
				{...input}
				{...muiProps}
				errorText={ touched && error ? error : '' }
			/>
		);
	}
}

export class renderMUISelectField extends PureComponent {
	render() {
		const { input, muiProps, meta: { touched, error }, children } = this.props;
		return (
			<SelectField
				{...input}
				{...muiProps}
				onChange={(e, i, value) => input.onChange(value)}
				errorText={ touched && error ? error : '' }
			>{children}</SelectField>
		);
	}
}

export class renderMUIAutocomplete extends Component {
	state = { searchText: '' };

	componentWillReceiveProps(nextProps) {
		if(nextProps.submitSucceeded || nextProps.submitFailed) {
			this.setState({ searchText: '', chosenRequest: null });
		}
	}

	handleTextFieldChange = searchText => {
		this.setState({ searchText });
	}

	handleChange = (chosenRequest, index) => {
		if(index === -1) {
			this.props.input.onChange('');
			this.setState({ searchText: '' });
		} else {
			this.setState({
				searchText: chosenRequest.text,
				chosenRequest
			});
			this.props.input.onChange(chosenRequest.value);
		}
	}
	//Dont ever try to make material-ui controls and redux-form to be friends xD
	handleBlur = e => {
		e.preventDefault();
		const { searchText, chosenRequest } = this.state;

		if(chosenRequest && chosenRequest.text === searchText) return;

		if(!searchText) {
			this.props.input.onChange('');
			this.setState({ chosenRequest: null });
			return;
		}

		if(!chosenRequest && searchText) {
			this.setState({ searchText: '' });
			return;
		}

		if(chosenRequest && searchText !== chosenRequest.text) {
			this.props.input.onChange('');
			this.setState({
				searchText: '',
				chosenRequest: null
			});
		}
	}

	render() {
		const { input, muiProps, meta: { visited, error } } = this.props;
		return (
			<AutoComplete
				{...input}
				{...muiProps}
				onUpdateInput={this.handleTextFieldChange}
				searchText={this.state.searchText}
				onNewRequest={this.handleChange}
				onBlur={this.handleBlur}
				errorText={ visited && error ? error : '' }
			/>
		);
	}
}