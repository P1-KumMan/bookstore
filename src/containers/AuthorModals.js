import { AuthorForm } from './AuthorForms'
import { UpdateAuthorForm } from '../containers/UpdateAuthorForm'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core'

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

export const UpdateAuthorModal = () => {
    const classes = useStyles()
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
export const AddAuthorForm = () => {
    const classes = useStyles()
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

export const DeleteAuthorform = () => {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={Upmodal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={Upmodal}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Are you sure?</h2>
                    <button onClick={() => handledelete(author._id)}>
                        Yes
                    </button>
                    <button onClick={handleClose}>No</button>
                </div>
            </Fade>
        </Modal>
    )
}
