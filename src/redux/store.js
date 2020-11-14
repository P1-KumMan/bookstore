import { createStore } from 'redux'
import bookStoreReducer from './reducers/bookStoreReducer'

export default createStore(bookStoreReducer)
