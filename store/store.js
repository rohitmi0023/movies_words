import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootreducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
	rootreducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
