import React, { useState } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

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
}))

export const BookTable = ({ apicall, books, isLoading }) => {
    const classes = useStyles()
    const [deleteModal, setdeleteModal] = useState(false)
    const [updateModal, setupdateModal] = useState(false)

    const deleteOpen = () => {
        setdeleteModal(true)
    }

    const deleteClose = () => {
        setdeleteModal(false)
    }

    const updateOpen = () => {
        setupdateModal(true)
    }

    const updateClose = () => {
        setupdateModal(false)
    }

    if (!isLoading) {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Book Name</TableCell>
                                <TableCell align="right">Author</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book, i) => (
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
                                            onClick={updateOpen}
                                            updateModal={updateModal}
                                            updateClose={updateClose}
                                            apicall={apicall}
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.button}
                                            onClick={deleteOpen}
                                            deleteModal={deleteModal}
                                            deleteClose={deleteClose}
                                            bookid={book._id}
                                            apicall={apicall}
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
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}
