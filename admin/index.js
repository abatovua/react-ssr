import 'isomorphic-fetch';
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter } from 'react-router-dom';

injectTapEventPlugin();

import './scss/main.scss';
import 'rc-color-picker/assets/index.css';

import { AdminApp } from './components/AdminApp';
import { configureStore } from './store/index';

const store = configureStore(window.__initial__);
delete window.__initial__;

render(
	<Provider store={store}>
		<MuiThemeProvider>
			<BrowserRouter>
				<AdminApp/>
			</BrowserRouter>
		</MuiThemeProvider>
	</Provider>
	, document.getElementById('main'));