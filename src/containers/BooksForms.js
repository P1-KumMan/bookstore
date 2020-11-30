import { React, useState, useEffect } from 'react'
import Api from '../Api'

const useInputvalue = (initialvalue) => {
    const [value, setvalue] = useState(initialvalue)
    return {
        value,
        onChange: (e) => setvalue(e.target.value),
        resetValue: () => setvalue(''),
    }
}

export const AddBookForm = ({ apicall, closemodal }) => {
    const titile = useInputvalue('')
    const [Authorslt, setAuthorslt] = useState([])
    const author = useInputvalue('')
    const initialstate = {
        nameError: '',
        authorError: '',
    }
    useEffect(() => {
        Api.get('author').then((res) => {
            console.log(res)
            setAuthorslt(res.data)
        })
    }, [])
    const [state, setstate] = useState(initialstate)
    const validation = () => {
        let nameError = ''
        let authorError = ''
        if (!titile.value) {
            nameError = 'Name canot be blank'
        }
        if (!author.value) {
            authorError = 'Author canot be blank'
        }
        if (authorError || nameError) {
            setstate({ authorError, nameError })
            return false
        }
        return true
    }
    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    // onSubmit(titile.value, author.value)
                    if (!validation()) {
                        return false
                    } else {
                        Api.post(`books`, {
                            bookname: titile.value,
                            author: author.value,
                        }).then((res) => {
                            console.log(res)
                            console.log(res.data)
                            apicall()
                            closemodal()
                        })
                        setstate(initialstate)
                    }
                    titile.resetvalue()
                    author.resetvalue()
                }}
            >
                <label>Book Name</label>
                <input {...titile} />
                <div style={{ fontSize: 12, color: 'red' }}>
                    {state.nameError}
                </div>
                <br></br>
                <label>Author</label>
                <select {...author}>
                    {Authorslt.map((author) => (
                        <option key={author._id}>{author.author}</option>
                    ))}
                </select>
                <br></br>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export const UpdateBookForm = ({ apicall, onSubmit, closemodal, book_id }) => {
    const titile = useInputvalue('')
    const [Authorslt, setAuthorslt] = useState([])
    const author = useInputvalue('')
    const initialState = {
        nameError: '',
        authorError: '',
    }
    useEffect(() => {
        Api.get('author').then((res) => {
            console.log(res)
            setAuthorslt(res.data)
        })
    }, [])
    const [state, setstate] = useState(initialState)
    const validation = () => {
        let nameError = ''
        let authorError = ''
        if (!titile.value) {
            nameError = 'Name canot be blank'
        }
        if (!author.value) {
            authorError = 'Author canot be blank'
        }
        if (authorError || nameError) {
            setstate({ authorError, nameError })
            return false
        }
        return true
    }
    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit(titile.value, author.value)
                    if (!validation()) {
                        return false
                    } else {
                        Api.patch(`books/${book_id}`, {
                            bookname: titile.value,
                            author: author.value,
                        }).then((res) => {
                            console.log(res)
                            console.log(res.data)
                            apicall()
                            closemodal()
                        })
                        setstate(initialState)
                    }
                    titile.resetvalue()
                    author.resetvalue()
                }}
            >
                <label>Book Name</label>
                <input {...titile} />
                <div style={{ fontSize: 12, color: 'red' }}>
                    {state.nameError}
                </div>
                <br></br>
                <label>Author</label>
                <select {...author}>
                    {Authorslt.map((author) => (
                        <option key={author._id}>{author.author}</option>
                    ))}
                </select>
                <br></br>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}
