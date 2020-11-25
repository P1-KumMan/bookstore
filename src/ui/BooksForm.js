import { React, useState } from 'react'
import Api from '../Api'

const useInputValue = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    return {
        value,
        onChange: (e) => setValue(e.target.value),
        resetValue: () => setValue(''),
    }
}

export const BookForm = ({ onSubmit }) => {
    const titile = useInputValue('')
    const author = useInputValue('')
    const initialState = {
        nameError: '',
        authorError: '',
    }
    const [state, setstate] = useState(initialState)
    const validation = () => {
        let nameError = ''
        let authorError = ''
        if (!titile.value) nameError = 'Name canot be blank'
        if (!author.value) authorError = 'Author canot be blank'
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
                        Api.post(`books`, {
                            bookname: titile.value,
                            author: author.value,
                        }).then((res) => {
                            console.log(res)
                            console.log(res.data)
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
                <input {...author} />
                <div style={{ fontSize: 12, color: 'red' }}>
                    {state.authorError}
                </div>
                <br></br>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}
