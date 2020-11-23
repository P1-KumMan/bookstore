import './App.css'
import React, { useState, useEffect } from 'react'
import ButtonAppBar from './ui/ButtonAppBar'
import SimpleCard from './ui/SimpleCard'
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Form } from './ui/Form'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Api from './Api'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
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
// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein }
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ]
const App = () => {
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
    console.log(state)
    const Appbody = () => {
        if (!loaded.load) {
            return (
                <div>
                    <Grid container spacing={2} className={classes.books}>
                        {state.map((book) => {
                            console.log(book)
                            return (
                                <Grid item>
                                    <SimpleCard
                                        id={book._id}
                                        book_name={book.bookname}
                                        author={book.author}
                                    ></SimpleCard>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        startIcon={<DeleteForeverIcon />}
                                        onClick={() => handledelete(book._id)}
                                    >
                                        Delete
                                    </Button>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="right">
                                        Book Name
                                    </TableCell>
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
                </div>
            )
        } else {
            return <div>Loading...</div>
        }
    }
    return (
        <div className="App">
            <ButtonAppBar></ButtonAppBar>
            <Appbody></Appbody>
            <Grid container spacing={2} className={classes.books}>
                <Grid item>
                    <Form onSubmit={(title, author) => true}></Form>
                </Grid>
            </Grid>
        </div>
    )
}

export default App
