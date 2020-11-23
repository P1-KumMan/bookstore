import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Api from '../Api'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import { makeStyles } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
    books: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    table: {
        minWidth: 650,
    },
})

const Books = (props) => {
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
    const Booktable = () => {
        if (!loaded.load) {
            return (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Book Name</TableCell>
                                <TableCell align="right">Author</TableCell>
                                <TableCell align="right">
                                    Carbs&nbsp;(g)
                                </TableCell>
                                <TableCell align="right">
                                    Protein&nbsp;(g)
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.map((book, i) => (
                                <TableRow key={book._id}>
                                    <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell align="right">
                                        {book.bookname}
                                    </TableCell>
                                    <TableCell align="right">
                                        {book.author}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.button}
                                            onClick={() =>
                                                handledelete(book._id)
                                            }
                                        >
                                            <DeleteForeverIcon />
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.button}
                                            onClick={() =>
                                                handledelete(book._id)
                                            }
                                        >
                                            <DeleteForeverIcon />
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        } else {
            return <div>Loading...</div>
        }
    }
    return <Booktable></Booktable>
}

export default Books
