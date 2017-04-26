import { createSelector } from 'reselect';

import {
	getCategoryIds,
	getCategoryMap,
	sort
} from './categories.selector';

const getProductIds = state => state.products.result;
export const getProductsMap = state => state.products.data;
const getProductsFilter = state => state.products.filter;
export const getProductsQuery = state => state.products.query;
const getMarkedProductId = state => state.products.markedForDeletion;

const getSortedCategories = createSelector(
	[getCategoryIds, getCategoryMap],
	(ids, categories) => sort(ids, categories, 'name')
);

const getSortedProducts = createSelector(
	[getProductIds, getProductsMap],
	(ids, products) => sort(ids, products, 'title')
);

const getProductsByFilter = createSelector(
	[getSortedProducts, getProductsMap, getProductsFilter],
	(ids, products, filter) => {
		if (filter === 'all') return ids;
		return ids.filter(id => products[id].category === filter);
	}
);

export const visibleProducts = createSelector(
	[getProductsByFilter, getProductsMap, getProductsQuery],
	(ids, products, query) => {
		if(query === '') return ids;
		return ids.filter(id => products[id].title.indexOf(query) === 0);
	}
);

export const getAutocompleteDataSource = createSelector(
	[getSortedCategories, getCategoryMap],
	(ids, categories) => ids.map(id => ({ text: categories[id].name, value: categories[id]._id }))
);

export const markedProduct = createSelector(
	[getProductsMap, getMarkedProductId, getCategoryMap],
	(products, marked, categories) => products[marked]
);

export const getCurrentFilterName = createSelector(
	[getCategoryMap, getProductsFilter],
	(categories, filter) => {
		if(filter === 'all') return '';
		return categories[filter].name;
	}
);

export const getProduct = (state, id) => {
	return state.products.data[id];
};




