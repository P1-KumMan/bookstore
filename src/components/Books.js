import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import Api from '../Api'
import { BookTable } from '../containers/BookTable'
import { AddBooksForm } from '../containers/BookModals'
// import { makeStyles } from '@material-ui/core'

// import { Grid } from '@material-ui/core'

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

const Books = () => {
    // const classes = useStyles()
    const [isLoading, setload] = useState(true)
    const [state, setstate] = useState([])
    const [Addmodal, setAddmodal] = useState(false)
    const apicall = () => {
        Api.get('books').then((res) => {
            console.log(res)
            setstate(res.data)
        })
    }
    const addbooksOpen = () => {
        setAddmodal(true)
    }
    const addbookClose = () => {
        setAddmodal(false)
    }

    useEffect(() => {
        Api.get('books').then((res) => {
            console.log(res)
            setload(false)
            setstate(res.data)
        })
    }, [])

    return (
        <div>
            <Button variant="contained" color="primary" onClick={addbooksOpen}>
                Add Books
            </Button>
            <AddBooksForm
                Addmodal={Addmodal}
                addbookClose={addbookClose}
                apicall={apicall}
            />
            <BookTable books={state} apicall={apicall} isLoading={isLoading} />
        </div>
    )
}

export default Books
