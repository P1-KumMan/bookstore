import { ADD_BOOK, DEL_BOOK } from '../actionTypes'

const initialState = {
    books: [],
}
const bookStoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOK:
            return [...state, action.books]
        case DEL_BOOK:
            const newstate = state.books.filter(
                (books) => books.id !== action.book.id
            )
            return [...newstate]
        default:
            return state
    }
}

export default bookStoreReducer
