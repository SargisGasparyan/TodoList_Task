import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import { reducers } from './reducers'

const persistConfig = {
  key: `_store`,
  storage,
}

const rootReducer = combineReducers(reducers)
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = applyMiddleware(thunk, logger)

export const store = createStore(
  persistedReducer,
  composeWithDevTools(middleware),
)
export const persistor = persistStore(store)
