import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
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
import EditIcon from '@material-ui/icons/Edit'
// import { Grid } from '@material-ui/core'
import { BookForm } from '../containers/BooksForm'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { UpdateBookForm } from '../containers/UpdateBookForm'

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

const Books = (props) => {
    const classes = useStyles()
    const [loaded, setload] = useState(true)
    const [state, setstate] = useState([])
    const [open, setOpen] = useState(false)
    const [Addmodal, setAddmodal] = useState(false)
    const apicall = () => {
        Api.get('books').then((res) => {
            console.log(res)
            setstate(res.data)
        })
    }
    // const handleUpdate = (id) => {
    //     Api.patch(`author/${id}`).then((res) => {})
    // }
    const addbooksOpen = () => {
        setAddmodal(true)
    }
    const addbookClose = () => {
        setAddmodal(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handledelete = (id) => {
        Api.delete(`books/${id}`).then((res) => {
            console.log(res)
            apicall()
            handleClose()
        })
    }
    useEffect(() => {
        Api.get('books').then((res) => {
            console.log(res)
            setload(false)
            setstate(res.data)
        })
    }, [])

    const Booktable = (books) => {
        if (!loaded.load) {
            return (
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
                                            onClick={addbooksOpen}
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.button}
                                            onClick={handleOpen}
                                        >
                                            <DeleteForeverIcon />
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={open}
                                        onClose={handleClose}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={open}>
                                            <div className={classes.paper}>
                                                <h2 id="transition-modal-title">
                                                    Are you sure?
                                                </h2>
                                                <button
                                                    onClick={() =>
                                                        handledelete(book._id)
                                                    }
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    onClick={() => handleClose}
                                                >
                                                    No
                                                </button>
                                            </div>
                                        </Fade>
                                    </Modal>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={Addmodal}
                                        onClose={addbookClose}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={Addmodal}>
                                            <div className={classes.paper}>
                                                <UpdateBookForm
                                                    onSubmit={() => true}
                                                    apicall={apicall}
                                                    closemodal={addbookClose}
                                                    book_id={book._id}
                                                ></UpdateBookForm>
                                            </div>
                                        </Fade>
                                    </Modal>
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
    const AddBooksForm = () => {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={Addmodal}
                onClose={addbookClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={Addmodal}>
                    <div className={classes.paper}>
                        <BookForm
                            onSubmit={() => true}
                            apicall={apicall}
                            closemodal={addbookClose}
                        ></BookForm>
                    </div>
                </Fade>
            </Modal>
        )
    }
    return (
        <div>
            <Button variant="contained" color="primary" onClick={addbooksOpen}>
                Add Books
            </Button>
            <AddBooksForm />
            <Booktable></Booktable>
        </div>
    )
}

export default Books
