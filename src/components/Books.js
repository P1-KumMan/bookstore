import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import Api from '../Api'
import { BookTable } from '../containers/BookTable'
import { AddBooksModal } from '../containers/BookModals'
import CircularIndeterminate from '../containers/CircularInterminate'
import { Grid } from '@material-ui/core'

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
    const [addmodal, setaddmodal] = useState(false)
    const apicall = () => {
        Api.get('books').then((res) => {
            console.log(res)
            setstate(res.data)
        })
    }
    const addbooksopen = () => {
        setaddmodal(true)
    }
    const addbookclose = () => {
        setaddmodal(false)
    }

    useEffect(() => {
        Api.get('books').then((res) => {
            console.log(res)
            setload(false)
            setstate(res.data)
        })
    }, [])
    if (!isLoading) {
        return (
            <div>
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    display="flex"
                    flex-direction="row"
                >
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addbooksopen}
                        >
                            Add Books
                        </Button>
                    </Grid>
                    <Grid item>
                        <AddBooksModal
                            addmodal={addmodal}
                            addbookclose={addbookclose}
                            apicall={apicall}
                        />
                        <BookTable
                            books={state}
                            apicall={apicall}
                            isLoading={isLoading}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    } else {
        return <CircularIndeterminate />
    }
}

export default Books
