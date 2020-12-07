import React, { useState, useEffect } from 'react'
import { Button, Typography } from '@material-ui/core'
import Api from '../Api'
import { makeStyles } from '@material-ui/core'

import { Grid } from '@material-ui/core'

import { AuthorTable } from '../containers/AuthorTable'
import { AddAuthorModal } from '../containers/AuthorModals'
import CircularIndeterminate from '../containers/CircularInterminate'

import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
    books: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    table: {
        minWidth: 650,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        fontsize: 10,
    },
}))

const Authors = () => {
    const classes = useStyles()
    const [addmodal, setaddmodal] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [state, setstate] = useState([])
    const [count, setcount] = useState([])

    const addauthoropen = () => {
        setaddmodal(true)
    }

    const addauthorclose = () => {
        setaddmodal(false)
    }
    const apicall = () => {
        Api.get('author').then((res) => {
            console.log(res)
            setisLoading(false)
            setstate(res.data)
        })
        Api.get('/books/count').then((res) => {
            console.log(res)
            setcount(res.data)
        })
    }

    useEffect(() => {
        Api.get('author').then((res) => {
            console.log(res)
            setisLoading(false)
            setstate(res.data)
        })
        Api.get('/books/count').then((res) => {
            console.log(res)
            setcount(res.data)
        })
    }, [])
    if (!isLoading)
        return (
            <div>
                <Grid
                    container
                    spacing={3}
                    direction="column"
                    display="flex"
                    flex-direction="row"
                >
                    <Grid item xs={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addauthoropen}
                            startIcon={<AddIcon />}
                            className={classes.button}
                        >
                            <Typography variant={'body2'}>Add</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <AuthorTable
                            isLoading={isLoading}
                            authors={state}
                            count={count}
                            apicall={apicall}
                        ></AuthorTable>
                        <AddAuthorModal
                            addmodal={addmodal}
                            addauthorclose={addauthorclose}
                            apicall={apicall}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    else {
        return <CircularIndeterminate />
    }
}

export default Authors
