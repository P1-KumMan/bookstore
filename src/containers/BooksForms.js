import { React, useState, useEffect } from 'react'
import Api from '../Api'
import { TextField, Button } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
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
        padding: theme.spacing(30, 70, 30),
    },
    textField: {
        width: theme.spacing(40),
    },
    button: {
        marginTop: theme.spacing(5),
    },
    button1: {
        marginRight: theme.spacing(10),
        marginTop: theme.spacing(5),
    },
    button2: {
        marginLeft: theme.spacing(8),
        marginTop: theme.spacing(5),
    },
}))

const useInputvalue = (initialvalue) => {
    const [value, setvalue] = useState(initialvalue)
    return {
        value,
        setvalue,
        onChange: (e) => setvalue(e.target.value),
        resetvalue: () => setvalue(''),
    }
}

export const AddBookForm = ({ apicall, closemodal }) => {
    const classes = useStyles()
    const titile = useInputvalue('')
    const [Authorslt, setAuthorslt] = useState([])
    console.log()
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
            author.setvalue(Authorslt[0]?.author)
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
                    console.log(titile.value, author.value)
                    if (!validation()) {
                        return false
                    } else {
                        console.log(author.value)
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
                <TextField
                    id="standard-basic"
                    label="Book Name"
                    {...titile}
                    className={classes.textField}
                />
                <div style={{ fontSize: 12, color: 'red' }}>
                    {state.nameError}
                </div>
                <br></br>

                <InputLabel
                    id="demo-simple-select-label"
                    className={classes.textField}
                >
                    Author
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...author}
                    className={classes.textField}
                >
                    {Authorslt.map((author) => (
                        <MenuItem value={author.author}>
                            {author.author}
                        </MenuItem>
                    ))}
                </Select>
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

export const UpdateBookForm = ({ apicall, closemodal, Book, book_id }) => {
    const classes = useStyles()
    console.log(Book)
    console.log(book_id)
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
                    if (!validation()) {
                        return false
                    } else {
                        Api.patch(`books/${Book._id}`, {
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
                <TextField
                    id="standard-basic"
                    placeholder={Book.bookname}
                    label="Book Name"
                    {...titile}
                    className={classes.textField}
                />
                <div style={{ fontSize: 12, color: 'red' }}>
                    {state.nameError}
                </div>
                <br></br>

                <InputLabel id="demo-simple-select-label">Author</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...author}
                    className={classes.textField}
                >
                    {Authorslt.map((author) => (
                        <MenuItem value={author.author}>
                            {author.author}
                        </MenuItem>
                    ))}
                </Select>
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
