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
import { AuthorForm } from '../containers/AuthorForm'
import { UpdateAuthorForm } from '../containers/UpdateAuthorForm'
import AuthorTable from '../containers/AuthorTable'

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
    const [Addmodal, setAddmodal] = useState(false)
    const [Upmodal, setUpmodal] = useState(false)

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

    const upauthorOpen = () => {
        setUpmodal(true)
    }
    const upauthorClose = () => {
        setUpmodal(false)
    }
    const addauthorOpen = () => {
        setAddmodal(true)
    }
    const addauthorClose = () => {
        setAddmodal(false)
    }
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
    const handleUpdate = (authordata) => {
        upauthorOpen()
        return authordata
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

    const UpdateModal = () => {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={Upmodal}
                onClose={upauthorClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={Upmodal}>
                    <div className={classes.paper}>
                        <UpdateAuthorForm
                            onSubmit={() => true}
                            apicall={apicall}
                            closemodal={upauthorClose}
                            author={handleUpdate}
                        ></UpdateAuthorForm>
                    </div>
                </Fade>
            </Modal>
        )
    }
    const AddAuthorForm = () => {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={Addmodal}
                onClose={addauthorClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={Addmodal}>
                    <div className={classes.paper}>
                        <AuthorForm
                            onSubmit={() => true}
                            apicall={apicall}
                            closemodal={addauthorClose}
                        ></AuthorForm>
                    </div>
                </Fade>
            </Modal>
        )
    }
    return (
        <div>
            <Button variant="contained" color="primary" onClick={addauthorOpen}>
                Add Author
            </Button>
            <UpdateModal></UpdateModal>
            <AddAuthorForm></AddAuthorForm>
            <Authortable></Authortable>
        </div>
    )
}

export default Authors
