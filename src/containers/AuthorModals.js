import { AddAuthorForm, UpdateAuthorForm } from '../containers/AuthorForms'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
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

export const UpdateAuthorModal = ({
    Upmodal,
    updateClose,
    refresh,
    authorid,
}) => {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={Upmodal}
            onClose={updateClose}
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
                        refresh={refresh}
                        closemodal={updateClose}
                        authorid={authorid}
                    ></UpdateAuthorForm>
                </div>
            </Fade>
        </Modal>
    )
}
export const AddAuthorModal = ({ Addmodal, addClose, apicall }) => {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={Addmodal}
            onClose={addClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={Addmodal}>
                <div className={classes.paper}>
                    <AddAuthorForm
                        onSubmit={() => true}
                        refresh={apicall}
                        closemodal={addClose}
                    ></AddAuthorForm>
                </div>
            </Fade>
        </Modal>
    )
}

const handledelete = ({ authorid, refresh, deleteClose }) => {
    Api.delete(`author/${authorid}`).then((res) => {
        console.log(res)
        refresh()
        deleteClose()
    })
}
export const DeleteAuthorModal = ({
    Delmodal,
    deleteClose,
    refresh,
    authorid,
}) => {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={Delmodal}
            onClose={deleteClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={Delmodal}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Are you sure?</h2>
                    <button
                        onClick={() =>
                            handledelete(authorid, refresh, deleteClose)
                        }
                    >
                        Yes
                    </button>
                    <button onClick={deleteClose}>No</button>
                </div>
            </Fade>
        </Modal>
    )
}
