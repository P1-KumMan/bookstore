import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { TextField } from '@material-ui/core'
import { connect, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button'
import store from '../redux/store'
import { ADD_BOOK } from '../redux/actionTypes'

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
const AddBookCard = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    return (
        <Card className={classes.root}>
            <CardContent>
                <form noValidate autoComplete="off" className={classes.form}>
                    <TextField id="standard-basic" label="Book Name" />
                    <TextField id="standard-basic" label="Author" />
                </form>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<AddCircleRoundedIcon />}
                    onClick={() => dispatch({ type: ADD_BOOK })}
                >
                    ADD BOOKS
                </Button>
            </CardContent>
        </Card>
    )
}

export default connect()(AddBookCard)
