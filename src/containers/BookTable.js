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
import { DeleteBooksModal, UpdateBooksModal } from '../containers/BookModals'

const useStyles = makeStyles((theme) => ({
    books: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    // table: {
    //     minWidth:
    // },
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
    tableheadin: {
        fontWeight: 700,
        fontSize: 16,
    },
    button: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
}))

export const BookTable = ({ apicall, books }) => {
    console.log(...books)
    const classes = useStyles()
    const [Bookid, setBookid] = useState('')
    const [deletemodal, setdeletemodal] = useState(false)
    const [Book, setBook] = useState('')
    const [updatemodal, setupdatemodal] = useState(false)

    const deletepass = (book_id) => {
        setBookid(book_id)
        deleteopen()
        return book_id
    }

    const updatepass = (book) => {
        setBook(book)
        updateopen()
    }
    const deleteopen = () => {
        setdeletemodal(true)
    }

    const deleteclose = () => {
        setdeletemodal(false)
    }

    const updateopen = () => {
        setupdatemodal(true)
    }

    const updateclose = () => {
        setupdatemodal(false)
    }
    console.log(deletemodal)
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableheadin}>
                                #
                            </TableCell>
                            <TableCell
                                className={classes.tableheadin}
                                align="right"
                            >
                                Book Name
                            </TableCell>
                            <TableCell
                                className={classes.tableheadin}
                                align="right"
                            >
                                Author
                            </TableCell>
                            <TableCell
                                className={classes.tableheadin}
                                align="right"
                            ></TableCell>
                            <TableCell
                                className={classes.tableheadin}
                                align="right"
                            ></TableCell>
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
                                        onClick={() => {
                                            updatepass(book, book._id)
                                        }}
                                        startIcon={<EditIcon />}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="large"
                                        className={classes.button}
                                        onClick={() => {
                                            deletepass(book._id)
                                            console.log(book._id)
                                        }}
                                        startIcon={<DeleteForeverIcon />}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DeleteBooksModal
                deletemodal={deletemodal}
                deleteclose={deleteclose}
                book_id={Bookid}
                apicall={apicall}
            />
            <UpdateBooksModal
                updatemodal={updatemodal}
                updateclose={updateclose}
                apicall={apicall}
                Book={Book}
                book_id={Bookid}
            />
        </div>
    )
}
