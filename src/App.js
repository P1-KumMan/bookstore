import './App.css'
import React, { useState } from 'react'
import ButtonAppBar from './components/ButtonAppBar'
import SimpleCard from './components/SimpleCard'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'
import { Form } from './components/Form'
// import AddBookCard from './components/AddBookCard'

const useStyles = makeStyles({
    books: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const initialState = [
    { title: 'Harry Potter', author: 'J.K. Rowling', id: Math.random() },
    {
        title: 'Computer Architecture',
        author: ' David A. Patterson',
        id: Math.random(),
    },
    {
        title: '12 Rules For Life',
        author: 'Jordan B. Peterson',
        id: Math.random(),
    },
]
const App = () => {
    const classes = useStyles()
    const [state, setstate] = useState(initialState)
    return (
        <div className="App">
            <ButtonAppBar></ButtonAppBar>
            <Grid container spacing={2} className={classes.books}>
                {state.map((books) => {
                    return (
                        <Grid item>
                            <SimpleCard
                                id={books.id}
                                book_name={books.title}
                                author={books.author}
                            ></SimpleCard>
                        </Grid>
                    )
                })}
                <Grid item>
                    <Form
                        onSubmit={(title, author) =>
                            setstate([
                                ...state,
                                {
                                    title: title,
                                    author: author,
                                    id: Math.random(),
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
