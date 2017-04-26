import { createSelector } from 'reselect';

export const sort = (ids, objectsMap, key) => {
  return [...ids.slice().sort((prev, next) => objectsMap[prev][key] !== objectsMap[next][key] ?
    objectsMap[prev][key] < objectsMap[next][key] ? -1 : 1 : 0)];
};

export const sortReverse = (ids, objectsMap, key) => {
  return [...ids.slice().sort((prev, next) => objectsMap[next][key] !== objectsMap[prev][key] ?
    objectsMap[next][key] < objectsMap[prev][key] ? -1 : 1 : 0)];
};

const getMarked = state => state.categories.markedForDeletion;
export const getQuery = state => state.categories.query;
export const getOrderBy = state => state.categories.orderBy;

export const getCategoryIds = state => state.categories.result;
export const getCategoryMap = state => state.categories.data;

const sortedCategories = createSelector(
  [getCategoryIds, getCategoryMap, getOrderBy],
  (ids, categories, orderBy) => {
    switch (orderBy) {
      case 'name':
        return sort(ids, categories, 'name');
      case 'name-reverse':
        return sortReverse(ids, categories, 'name');
      default:
        return categories;
    }
  }
);

export const visibleCategories = createSelector(
  [getQuery, sortedCategories, getCategoryMap],
  (query, ids, categories) => {
    if (query === '') return ids;
    return ids.filter(id => categories[id].name.indexOf(query) === 0)
  }
);

export const markedCategory = createSelector(
  [getCategoryMap, getMarked],
  (categories, marked) => categories[marked]
);

export const getCategory = (state, id) => {
  return state.categories.data[id];
};

export const getSelectFieldDataSet = createSelector(
  [getCategoryIds, getCategoryMap],
  (ids, categories) => {
    return sort(ids, categories, 'name')
    .map(id => ({ value: categories[id]._id, text: categories[id].name }));
  }
)