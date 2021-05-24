import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import reducer from "./reducer";

export default () => {
    const devMiddleware = [require('redux-immutable-state-invariant').default()];
    const prodMiddleware = [];
    const middleware = process.env.NODE_ENV !== 'production' ? devMiddleware : prodMiddleware;

    return createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))
}