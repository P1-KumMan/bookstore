import { React, useState } from 'react'
import Api from '../Api'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(15, 35, 15),
    },
    button1: {
        marginRight: theme.spacing(2),
    },
    button2: {
        marginLeft: theme.spacing(1),
    },
}))

const useInputvalue = (initialvalue) => {
    const [value, setvalue] = useState(initialvalue)
    return {
        value,
        onChange: (e) => setvalue(e.target.value),
        resetvalue: () => setvalue(''),
    }
}

export const AddAuthorForm = ({ addauthorclose, apicall }) => {
    const classes = useStyles()
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
                <Button
                    variant="outlined"
                    type="submit"
                    color="secondary"
                    className={classes.button1}
                    onClick={addauthorclose}
                >
                    close
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    className={classes.button2}
                >
                    submit
                </Button>
            </form>
        </div>
    )
}

export const UpdateAuthorForm = ({ Authordata, closemodal, apicall }) => {
    const classes = useStyles()
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
                        })
                        Api.patch(`books/author/${Authordata.author}`, {
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
                <Button
                    variant="outlined"
                    type="submit"
                    color="secondary"
                    className={classes.button1}
                    onClick={closemodal}
                >
                    close
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    className={classes.button2}
                >
                    submit
                </Button>
            </form>
        </div>
    )
}
