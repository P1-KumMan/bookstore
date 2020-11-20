import './App.css'
import React, { useState, useEffect } from 'react'
import ButtonAppBar from './components/ButtonAppBar'
import SimpleCard from './components/SimpleCard'
import { Grid, Button } from '@material-ui/core'

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
        Api.get('books.json').then((res) => {
            console.log(res)
            setstate(res.data)
        })
    })
    console.log(state)
    let books = []
    for (let key in state) {
        books.push({
            ...state[key],
            id: key,
        })
    }
    return (
        <div className="App">
            <ButtonAppBar></ButtonAppBar>
            <Grid container spacing={2} className={classes.books}>
                {books.map((book) => {
                    console.log(book)
                    return (
                        <Grid item>
                            <SimpleCard
                                id={book.id}
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
