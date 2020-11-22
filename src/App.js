import './App.css'
import React, { useState, useEffect } from 'react'
import ButtonAppBar from './components/ButtonAppBar'
import SimpleCard from './components/SimpleCard'
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Form } from './components/Form'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Api from './Api'

const useStyles = makeStyles({
    books: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
const App = () => {
    const classes = useStyles()
    const [loaded, setload] = useState({ load: true })
    const [state, setstate] = useState([])
    useEffect(() => {
        Api.get('books').then((res) => {
            console.log(res)
            setload({ load: false })
            setstate(res.data)
        })
    }, [state])
    const handledelete = (id) => {
        Api.delete(`books/${id}`).then((res) => {
            console.log(res)
        })
    }
    console.log(state)
    const Appbody = () => {
        if (!loaded.load) {
            return (
                <Grid container spacing={2} className={classes.books}>
                    {state.map((book) => {
                        console.log(book)
                        return (
                            <Grid item>
                                <SimpleCard
                                    id={book._id}
                                    book_name={book.bookname}
                                    author={book.author}
                                ></SimpleCard>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<DeleteForeverIcon />}
                                    onClick={() => handledelete(book._id)}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        )
                    })}
                </Grid>
            )
        } else {
            return <div>Loading...</div>
        }
    }
    return (
        <div className="App">
            <ButtonAppBar></ButtonAppBar>
            <Appbody></Appbody>
            <Grid container spacing={2} className={classes.books}>
                <Grid item>
                    <Form
                        onSubmit={(title, author) =>
                            setstate([
                                {
                                    title: title,
                                    author: author,
                                },
                            ])
                        }
                    ></Form>
                </Grid>
            </Grid>
        </div>
    )
}

export default App
