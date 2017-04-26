import {
	ADD_CATEGORY,
	ADD_CATEGORY_SUCCESS,
	ADD_CATEGORY_FAIL,
	UPDATE_CATEGORY,
	UPDATE_CATEGORY_SUCCESS,
	UPDATE_CATEGORY_FAIL,
	MARK_CATEGORY_TO_DELETE,
	DISCARD_CATEGORY_TO_DELETE,
	DELETE_CATEGORY,
	DELETE_CATEGORY_SUCCESS,
	DELETE_CATEGORY_FAIL,
	CHANGE_CATEGORIES_ORDER,
	SEARCH_CATEGORIES
} from '../constants/types';

const deleteCategory = (deletedId, data, result) => {
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
	data: {},
	result: [],
	markedForDeletion: null,
	orderBy: 'name',
	query: ''
};

const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_CATEGORY:
			return state;
		case ADD_CATEGORY_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					[action.payload._id]: action.payload
				},
				result: [...state.result, action.payload._id]
			};
		case ADD_CATEGORY_FAIL:
			return state;

		case UPDATE_CATEGORY:
			return state;
		case UPDATE_CATEGORY_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					[action.payload._id]: action.payload
				}
			};
		case UPDATE_CATEGORY_FAIL:
			return state;

		case MARK_CATEGORY_TO_DELETE:
			return { ...state, markedForDeletion: action.payload };
		case DISCARD_CATEGORY_TO_DELETE:
			return { ...state, markedForDeletion: null };

		case DELETE_CATEGORY:
			return state;
		case DELETE_CATEGORY_SUCCESS:
			return {
				...state,
				...deleteCategory(action.payload, state.data, state.result),
				markedForDeletion: null
			};
		case DELETE_CATEGORY_FAIL:
			return state;

		case CHANGE_CATEGORIES_ORDER:
			return { ...state, orderBy: action.payload };
		case SEARCH_CATEGORIES:
			return { ...state, query: action.payload };

		default:
			return state;
	}
}

export default categoriesReducer;