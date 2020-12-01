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

export const AuthorTable = ({ loaded, authors, count, apicall, authorid }) => {
    const classes = useStyles()
    const [Delmodal, setDelmodal] = useState(false)
    const [Upmodal, setUpmodal] = useState(false)

    const updateopen = () => {
        setUpmodal(true)
    }
    const updateclose = () => {
        setUpmodal(false)
    }
    const deleteopen = () => {
        setDelmodal(true)
    }
    const deleteclose = () => {
        setDelmodal(false)
    }
    if (!loaded) {
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
                                            onClick={updateopen}
                                            Upmodal={Upmodal}
                                            updateClose={updateclose}
                                            refresh={apicall}
                                            authorid={authorid}
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.button}
                                            onClick={deleteopen}
                                            Delmodal={Delmodal}
                                            deleteClose={deleteclose}
                                            refresh={apicall}
                                            authorid={authorid}
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
