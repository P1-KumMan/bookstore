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

export const UpdateAuthorForm = ({
    onSubmit,
    closemodal,
    apicall,
    author_id,
}) => {
    const author = useInputValue('')
    const initialState = {
        authorError: '',
    }
    const [state, setstate] = useState(initialState)
    const validation = () => {
        let nameError = ''
        let authorError = ''
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
                    console.log(author_id)
                    e.preventDefault()
                    onSubmit(author.value)
                    if (!validation()) {
                        return false
                    } else {
                        Api.patch(`author/${author_id}`, {
                            author: author.value,
                        }).then((res) => {
                            console.log(res)
                            console.log(res.data)
                            apicall()
                            closemodal()
                        })
                        setstate(initialState)
                    }
                    author.resetValue()
                }}
            >
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
