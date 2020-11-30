import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import Api from '../Api'
// import { makeStyles } from '@material-ui/core'

// import { Grid } from '@material-ui/core'

import { AuthorTable } from '../containers/AuthorTable'

// const useStyles = makeStyles((theme) => ({
//     books: {
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     table: {
//         minWidth: 650,
//     },
//     modal: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     paper: {
//         backgroundColor: theme.palette.background.paper,
//         border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
// }))

const Authors = () => {
    // const classes = useStyles()
    const [Addmodal, setAddmodal] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [state, setstate] = useState([])
    const [count, setcount] = useState([])

    const addauthorOpen = () => {
        setAddmodal(true)
    }

    const addauthorClose = () => {
        setAddmodal(false)
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

    return (
        <div>
            <Button variant="contained" color="primary" onClick={addauthorOpen}>
                Add Author
            </Button>
            <AuthorTable
                isLoading={isLoading}
                authors={state}
                count={count}
                apicall={apicall}
                handleClose={addauthorClose}
                Addmodal={Addmodal}
            ></AuthorTable>
        </div>
    )
}

export default Authors
