import { ADD_BOOK, DEL_BOOK } from '../actionTypes'

const initialState = {
    books: [{}],
}

const bookStoreReducer = (state = initialState, action) => {
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case ADD_BOOK:
            const book = {
                id: action.id,
                name: action.name,
                author: action.author,
            }
            nextState[action.id] = book
            return nextState
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
