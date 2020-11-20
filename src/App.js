import './App.css'
import React, { useState, useEffect } from 'react'
import ButtonAppBar from './components/ButtonAppBar'
import SimpleCard from './components/SimpleCard'
import { Grid } from '@material-ui/core'

import { makeStyles } from '@material-ui/core'
import { Form } from './components/Form'
import Api from './Api'

const useStyles = makeStyles({
    books: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
const App = () => {
    const classes = useStyles()
    const [state, setstate] = useState([])
    useEffect(() => {
        Api.get('books').then((res) => {
            console.log(res)
            setstate(res.data)
        })
    }, [state])
    console.log(state)
    return (
        <div className="App">
            <ButtonAppBar></ButtonAppBar>
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
                        </Grid>
                    )
                })}
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
