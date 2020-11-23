import './App.css'
import React from 'react'
import ButtonAppBar from './ui/ButtonAppBar'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Form } from './ui/Form'
import Books from './components/Books'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

const App = () => {
    const classes = useStyles()
    return (
        <div className="App">
            <ButtonAppBar></ButtonAppBar>
            <Grid
                container
                spacing={2}
                direction="column"
                justify="flex-start"
                alignItems="center"
                className={classes.books}
            >
                <Grid item>
                    <Books />
                </Grid>
                <Grid item>
                    <Form onSubmit={(title, author) => true}></Form>
                </Grid>
            </Grid>
        </div>
    )
}

export default App
