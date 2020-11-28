import { React, useState, useEffect } from 'react'
import Api from '../Api'

const useInputValue = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    return {
        value,
        onChange: (e) => setValue(e.target.value),
        resetValue: () => setValue(''),
    }
}

export const UpdateBookForm = ({ apicall, onSubmit, closemodal, book_id }) => {
    const titile = useInputValue('')
    const [Authorslt, setAuthorslt] = useState([])
    const author = useInputValue('')
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
                    titile.resetValue()
                    author.resetValue()
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
