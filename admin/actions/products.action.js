import {
	ADD_PRODUCT,
	ADD_PRODUCT_SUCCESS,
	ADD_PRODUCT_FAIL,
	UPDATE_PRODUCT,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_FAIL,
	CHANGE_PRODUCTS_FILTER,
	SEARCH_PRODUCTS,
	MARK_PRODUCT_TO_DELETE,
	DISCARD_PRODUCT_TO_DELETE,
	DELETE_PRODUCT,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL
} from '../constants/types';

import api from '../constants/api';

import { reset } from 'redux-form';

const formatPrice = value => {
	return +((+value).toFixed(2));
};

export const addProduct = data => dispatch => {
	dispatch({ type: ADD_PRODUCT });
	data.price = formatPrice(data.price);
	api.addProduct(data)
		.then(data => {
			dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data.product });
			dispatch(reset('addProduct'));
		})
		.catch(e => {
			dispatch({ type: ADD_PRODUCT_FAIL });
			dispatch(reset('addProduct'));
		});
};

export const deleteProduct = id => dispatch => {
	dispatch({ type: DELETE_PRODUCT });
	api.deleteProduct(id)
		.then(data => {
			dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.deleted });
		})
		.catch(e => {
			dispatch({ type: DELETE_PRODUCT_FAIL });
		});
};

export const updateProduct = (id, data) => dispatch => {
	dispatch({ type: UPDATE_PRODUCT });
	data.price = formatPrice(data.price);
	api.updateProduct(id, data)
		.then(data => {
			dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.updated });
		})
		.catch(e => {
			dispatch({ type: UPDATE_PRODUCT_FAIL });
		});
};

export const changeProductsFilter = category => ({ type: CHANGE_PRODUCTS_FILTER, payload: category });

export const markProductToDelete = id => ({ type: MARK_PRODUCT_TO_DELETE, payload: id });
export const discardProductToDelete = () => ({ type: DISCARD_PRODUCT_TO_DELETE });

export const searchProducts = query => ({
	type: SEARCH_PRODUCTS,
	payload: query,
	meta: {
		debounce: { time: 300 }
	}
});
