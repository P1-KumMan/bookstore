import { React, useState } from 'react'
import Api from '../Api'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useInputvalue = (initialvalue) => {
    const [value, setvalue] = useState(initialvalue)
    return {
        value,
        onChange: (e) => setvalue(e.target.value),
        resetvalue: () => setvalue(''),
    }
}

export const AddAuthorForm = ({ addauthorclose, apicall }) => {
    console.log('rendering?')
    const author = useInputvalue('')
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
                    e.preventDefault()
                    if (!validation()) {
                        return false
                    } else {
                        Api.post(`author`, {
                            author: author.value,
                        }).then((res) => {
                            console.log(res)
                            console.log(res.data)
                            apicall()
                            addauthorclose()
                        })
                        setstate(initialState)
                    }
                    author.resetvalue()
                }}
            >
                {/* <input {...author} /> */}
                <TextField id="standard-basic" label="Author" {...author} />
                <div style={{ fontSize: 12, color: 'red' }}>
                    {state.authorError}
                </div>
                <br></br>
                <Button variant="contained" type="submit" color="primary">
                    submit
                </Button>
            </form>
        </div>
    )
}

// const handleUpdate = (authordata) => {
//     upauthorOpen()
//     return authordata
// }
export const UpdateAuthorForm = ({ Authordata, closemodal, apicall }) => {
    const author = useInputvalue('')
    const initialState = {
        authorError: '',
    }
    console.log(Authordata)
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
                    console.log(Authordata)
                    e.preventDefault()
                    if (!validation()) {
                        return false
                    } else {
                        Api.patch(`author/${Authordata._id}`, {
                            author: author.value,
                        }).then((res) => {
                            console.log(res)
                            console.log(res.data)
                            apicall()
                            closemodal()
                        })
                        setstate(initialState)
                    }
                    author.resetvalue()
                }}
            >
                {/* <input
                    {...author}
                    defaultValue={Authordata.author}
                    placeholder={Authordata.author}
                ></input> */}
                <TextField
                    id="standard-basic"
                    label="Author"
                    {...author}
                    placeholder={Authordata.author}
                />

                <div style={{ fontSize: 12, color: 'red' }}>
                    {state.authorError}
                </div>
                <br></br>
                <Button variant="contained" type="submit" color="primary">
                    submit
                </Button>
            </form>
        </div>
    )
}
