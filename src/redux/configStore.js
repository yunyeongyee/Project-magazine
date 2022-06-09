import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { connectRouter } from 'connected-react-router';

import Store from './modules/Store';




const rootReducer = combineReducers({
   Store: Store,
});

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

const store = () => createStore(rootReducer, enhancer);

export default store();
