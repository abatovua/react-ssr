import { combineReducers } from 'redux';

import categories from './categories.reducer';
import products from './products.reducer';
import form from './forms.reducer';

export const rootReducer = combineReducers({
	form,
	categories,
	products
});
