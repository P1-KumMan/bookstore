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
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import EditIcon from '@material-ui/icons/Edit'
// import { Grid } from '@material-ui/core'
import { AuthorForm } from '../ui/AuthorForm'

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

const Authors = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const apicall = () => {
        Api.get('author').then((res) => {
            console.log(res)
            setload({ load: false })
            setstate(res.data)
        })
        Api.get('/books/count').then((res) => {
            console.log(res)
            setcount(res.data)
        })
    }
    // const handleUpdate = (id) => {
    //     Api.patch(`author/${id}`).then((res) => {})
    // }

    const handledelete = (id) => {
        Api.delete(`author/${id}`).then((res) => {
            console.log(res)
            apicall()
            handleClose()
        })
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const hm = () => {
        return '0'
    }
    const [loaded, setload] = useState({ load: true })
    const [state, setstate] = useState([])
    const [count, setcount] = useState([])
    useEffect(() => {
        Api.get('author').then((res) => {
            console.log(res)
            setload({ load: false })
            setstate(res.data)
        })
        Api.get('/books/count').then((res) => {
            console.log(res)
            setcount(res.data)
        })
    }, [])
    console.log(state)
    const Authortable = () => {
        if (!loaded.load) {
            return (
                <div>
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="right">Author</TableCell>
                                    <TableCell align="right">
                                        No of Books
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.map((author, i) => (
                                    <TableRow key={author._id}>
                                        <TableCell component="th" scope="row">
                                            {i}
                                        </TableCell>
                                        <TableCell align="right">
                                            {author.author}
                                        </TableCell>
                                        <TableCell align="right">
                                            {count[author.author] || hm()}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                className={classes.button}
                                                onClick={() => true}
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
                                                            handledelete(
                                                                author._id
                                                            )
                                                        }
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        onClick={handleClose}
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </Fade>
                                        </Modal>
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
    return (
        <div>
            <Authortable></Authortable>
            <AuthorForm onSubmit={() => true}></AuthorForm>
        </div>
    )
}

export default Authors
