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
    updateclose,
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
            onClose={updateclose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={Upmodal}>
                <div className={classes.paper}>
                    <UpdateAuthorForm
                        refresh={refresh}
                        closemodal={updateclose}
                        authorid={authorid}
                    ></UpdateAuthorForm>
                </div>
            </Fade>
        </Modal>
    )
}
export const AddAuthorModal = ({ addmodal, addauthorclose, apicall }) => {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={addmodal}
            onClose={addauthorclose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={addmodal}>
                <div className={classes.paper}>
                    <AddAuthorForm
                        refresh={apicall}
                        closemodal={addauthorclose}
                    ></AddAuthorForm>
                </div>
            </Fade>
        </Modal>
    )
}

export const DeleteAuthorModal = ({
    Delmodal,
    deleteclose,
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
            onClose={deleteclose}
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
                        onClick={() => {
                            Api.delete(`author/${authorid}`).then((res) => {
                                console.log(res)
                                refresh()
                                deleteclose()
                            })
                        }}
                    >
                        Yes
                    </button>
                    <button onClick={deleteclose}>No</button>
                </div>
            </Fade>
        </Modal>
    )
}
