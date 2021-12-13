import { createStore, applyMiddleware} from "redux";
import rootReducer from "../reducer/index";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;

/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store; */