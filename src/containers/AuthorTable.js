import React, { useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import { makeStyles } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { Button } from '@material-ui/core'
import {
    UpdateAuthorModal,
    DeleteAuthorModal,
} from '../containers/AuthorModals'

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

export const AuthorTable = ({ isLoading, authors, count, apicall }) => {
    const classes = useStyles()
    const [delmodal, setdelmodal] = useState(false)
    const [Authorid, setAuthorid] = useState('')
    const [Authordata, setAuthordata] = useState({})
    const [upmodal, setupmodal] = useState(false)

    const updateopen = (author) => {
        setupmodal(true)
        setAuthordata(author)
    }
    const updateclose = () => {
        setupmodal(false)
    }
    const deleteopen = (authorid) => {
        setdelmodal(true)
        setAuthorid(authorid)
    }
    const deleteclose = () => {
        setdelmodal(false)
    }
    if (!isLoading) {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Author</TableCell>
                                <TableCell align="right">No of Books</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {authors.map((author, i) => (
                                <TableRow key={author._id}>
                                    <TableCell component="th" scope="row">
                                        {i}
                                    </TableCell>
                                    <TableCell align="right">
                                        {author.author}
                                    </TableCell>
                                    <TableCell align="right">
                                        {count[author.author] || '0'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.button}
                                            onClick={() => {
                                                updateopen(author)
                                                console.log(author)
                                            }}
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.button}
                                            onClick={() =>
                                                deleteopen(author._id)
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
                <UpdateAuthorModal
                    upmodal={upmodal}
                    updateclose={updateclose}
                    apicall={apicall}
                    Authordata={Authordata}
                />
                <DeleteAuthorModal
                    delmodal={delmodal}
                    deleteclose={deleteclose}
                    apicall={apicall}
                    Authorid={Authorid}
                />
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}
