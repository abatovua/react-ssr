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

const handleProductDeletion = (deletedId, data, result) => {
	const modified = result.filter(id => id !== deletedId);
	return {
		data: modified.reduce((acc, id) => {
			acc[id] = data[id];
			return acc;
		}, {}),
		result: modified
	};
};

const initialState = {
	result: [],
	data: {},
	filter: 'all',
	query: '',
	markedForDeletion: null
};

const productsReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_PRODUCT:
			return state;
		case ADD_PRODUCT_SUCCESS:
			return {
				...state,
				result: [ ...state.result, action.payload._id ],
				data: {
					...state.data,
					[action.payload._id]: action.payload
				}
			};
		case ADD_PRODUCT_FAIL:
			return state;

		case UPDATE_PRODUCT:
			return state;
		case UPDATE_PRODUCT_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					[action.payload._id]: action.payload
				}
			};
		case UPDATE_PRODUCT_FAIL:
			return state;

		case CHANGE_PRODUCTS_FILTER:
			return { ...state, filter: action.payload };
		case SEARCH_PRODUCTS:
			return { ...state, query: action.payload };

		case MARK_PRODUCT_TO_DELETE:
			return { ...state, markedForDeletion: action.payload };
		case DISCARD_PRODUCT_TO_DELETE:
			return { ...state, markedForDeletion: null };

		case DELETE_PRODUCT:
			return state;
		case DELETE_PRODUCT_SUCCESS:
			return {
				...state,
				...handleProductDeletion(action.payload, state.data, state.result),
				markedForDeletion: null,
			};
		case DELETE_PRODUCT_FAIL:
			return state;

		default:
			return state;
	}
};

export default productsReducer;