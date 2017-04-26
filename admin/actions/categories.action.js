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
  SEARCH_CATEGORIES,
  TOGGLE_CATEGORY_EDIT_MODE
} from '../constants/types';

import api from '../constants/api';

import { reset } from 'redux-form';

export const addCategory = data => dispatch => {
  dispatch({ type: ADD_CATEGORY });
  api.addCategory(data)
  .then(data => {
    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: data.category });
    dispatch(reset('addCategory'));
  })
  .catch(e => {
    dispatch({ type: ADD_CATEGORY_FAIL })
  });
};


export const deleteCategory = id => dispatch => {
  dispatch({ type: DELETE_CATEGORY });
  api.deleteCategory(id)
  .then(data => {
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data.deleted });
  })
  .catch(e => {
    dispatch({ type: DELETE_CATEGORY_FAIL });
  });
};

export const updateCategory = (id, data) => dispatch => {
  dispatch({ type: UPDATE_CATEGORY });
  api.updateCategory(id, data)
  .then(data => {
    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data.updated });
  })
  .catch(e => {
    dispatch({ type: UPDATE_CATEGORY_FAIL });
  });
}

export const markCategoryToDelete = id => ({ type: MARK_CATEGORY_TO_DELETE, payload: id });
export const discardCategoryToDelete = () => ({ type: DISCARD_CATEGORY_TO_DELETE });

export const changeCategoriesOrder = order => ({ type: CHANGE_CATEGORIES_ORDER, payload: order });

export const findCategories = query => ({
  type: SEARCH_CATEGORIES,
  payload: query,
  meta: {
    debounce: { time: 300 }
  }
});