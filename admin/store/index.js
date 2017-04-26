import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/index';
import createDebounce from 'redux-debounced';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const debounce = createDebounce();

let middleWares;

if (process.env.NODE_ENV !== "production") {
  const logger = createLogger({
    // predicate: (getState, action) => !!/^@@redux-form/gi.test(action.type)
    predicate: (getState, action) => true
  });
  middleWares = applyMiddleware(debounce, thunk, logger);
} else {
  middleWares = applyMiddleware(debounce, thunk);
}


export const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    middleWares
  );

  return store;
};

