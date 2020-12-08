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
    // table: {
    //     minWidth: 650,
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
    const deleteopen = (authorid, author) => {
        setdelmodal(true)
        setAuthorid(authorid)
        setAuthordata(author)
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
                                <TableCell className={classes.tableheadin}>
                                    #
                                </TableCell>
                                <TableCell className={classes.tableheadin}>
                                    Author
                                </TableCell>
                                <TableCell className={classes.tableheadin}>
                                    No of Books
                                </TableCell>
                                <TableCell
                                    className={classes.tableheadin}
                                ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {authors.map((author, i) => (
                                <TableRow key={author._id}>
                                    <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell>{author.author}</TableCell>
                                    <TableCell align="left">
                                        {count[author.author] || '0'}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.button}
                                            onClick={() => {
                                                updateopen(author)
                                                // console.log(author)
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
                                            onClick={() =>
                                                deleteopen(author._id, author)
                                            }
                                            startIcon={<DeleteForeverIcon />}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
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
                    Authordata={Authordata}
                />
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}
