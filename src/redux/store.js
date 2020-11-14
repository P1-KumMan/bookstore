import { createStore } from 'redux'
import bookStoreReducer from './reducers/bookstore'

export default createStore(bookStoreReducer)
