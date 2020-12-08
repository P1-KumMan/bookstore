import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { AddBookForm } from '../containers/BooksForms'
import { UpdateBookForm } from '../containers/BooksForms'
import { makeStyles, Button } from '@material-ui/core'
import Api from '../Api'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(30, 70, 30),
    },
    paper1: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(15, 35, 15),
    },
    button1: {
        marginRight: theme.spacing(2),
    },
    button2: {
        marginLeft: theme.spacing(1),
    },
}))

export const AddBooksModal = ({ addmodal, addbookclose, apicall }) => {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={addmodal}
            onClose={addbookclose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={addmodal}>
                <div className={classes.paper1}>
                    <AddBookForm
                        apicall={apicall}
                        closemodal={addbookclose}
                    ></AddBookForm>
                </div>
            </Fade>
        </Modal>
    )
}
export const UpdateBooksModal = ({
    updatemodal,
    apicall,
    updateclose,
    Book,
    book_id,
}) => {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={updatemodal}
            onClose={updateclose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={updatemodal}>
                <div className={classes.paper1}>
                    <UpdateBookForm
                        onSubmit={() => true}
                        apicall={apicall}
                        closemodal={updateclose}
                        Book={Book}
                        book_id={book_id}
                    ></UpdateBookForm>
                </div>
            </Fade>
        </Modal>
    )
}
// export const
export const DeleteBooksModal = ({
    deletemodal,
    deleteclose,
    book_id,
    apicall,
}) => {
    const classes = useStyles()
    console.log(book_id)
    // let book_id=book.book_id;
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={deletemodal}
            onClose={deleteclose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={deletemodal}>
                <div className={classes.paper1}>
                    <h2 id="transition-modal-title">Are you sure?</h2>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button1}
                        onClick={() => {
                            Api.delete(`books/${book_id}`).then((res) => {
                                console.log(book_id)
                                console.log(res)
                                apicall()
                                deleteclose()
                            })
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button2}
                        onClick={deleteclose}
                    >
                        No
                    </Button>
                </div>
            </Fade>
        </Modal>
    )
}
