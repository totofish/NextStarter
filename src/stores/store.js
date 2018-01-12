import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas/rootSaga';

// const isClient = typeof window !== 'undefined';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const enhancers = compose((
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
    ? window.devToolsExtension && window.devToolsExtension()
    : f => f
));

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default (initialState) => {
  const store = createStoreWithMiddleware(rootReducer, initialState, enhancers);
  sagaMiddleware.run(rootSaga);
  return store;
};
