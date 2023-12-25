import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { userService } from "../services/user.service.js"
import { carReducer } from "./reducers/car.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

// const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
    carModule: carReducer,
    userModule: userReducer,
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })