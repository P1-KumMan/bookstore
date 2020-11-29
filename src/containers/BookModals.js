import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { BookForm } from '../containers/BooksForm'
import { UpdateBookForm } from '../containers/UpdateBookForm'
import { makeStyles } from '@material-ui/core'
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
        padding: theme.spacing(2, 4, 3),
    },
}))

export const AddBooksForm = ({ Addmodal, addbookClose, apicall }) => {
    const classes = useStyles()
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
export const UpdateBooksForm = ({
    updateModal,
    apicall,
    updateClose,
    bookid,
}) => {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={updateModal}
            onClose={updateClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={updateModal}>
                <div className={classes.paper}>
                    <UpdateBookForm
                        onSubmit={() => true}
                        apicall={apicall}
                        closemodal={updateClose}
                        book_id={bookid}
                    ></UpdateBookForm>
                </div>
            </Fade>
        </Modal>
    )
}
export const handledelete = ({ bookid, apicall, deleteClose }) => {
    Api.delete(`books/${bookid}`).then((res) => {
        console.log(res)
        apicall()
        deleteClose()
    })
}
export const DeleteBooksForm = ({
    deleteModal,
    deleteClose,
    bookid,
    apicall,
}) => {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={deleteModal}
            onClose={deleteClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={deleteModal}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Are you sure?</h2>
                    <button
                        onClick={() =>
                            handledelete(bookid, apicall, deleteClose)
                        }
                    >
                        Yes
                    </button>
                    <button onClick={() => deleteClose}>No</button>
                </div>
            </Fade>
        </Modal>
    )
}
