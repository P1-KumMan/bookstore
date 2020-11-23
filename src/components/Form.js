import { React, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Api from '../Api'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        height: 350,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 600,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        alignItems: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
    },
})

const useInputValue = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    return {
        value,
        onChange: (e) => setValue(e.target.value),
        resetValue: () => setValue(''),
    }
}

export const Form = ({ onSubmit }) => {
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
