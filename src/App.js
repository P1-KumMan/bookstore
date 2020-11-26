import './App.css'
import React from 'react'
import ButtonAppBar from './ui/ButtonAppBar'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { BookForm } from './ui/BooksForm'
import Authors from './components/Authors'
import Books from './components/Books'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Drawer from '@material-ui/core/Drawer'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { AuthorForm } from './ui/AuthorForm'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

const App = () => {
    const classes = useStyles()
    return (
        <div className="App">
            <BrowserRouter>
                <ButtonAppBar />
                <div className={classes.root}>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="left"
                    >
                        <div className={classes.toolbar} />
                        <h2>BOOKSTORE</h2>
                        <Divider />
                        <List>
                            <Link to="/">
                                <ListItemIcon></ListItemIcon>
                                <ListItemText primary="Books " />
                            </Link>
                        </List>
                        <Divider />
                        <List>
                            <Link to="/author">
                                <ListItemIcon></ListItemIcon>
                                <ListItemText primary="Authors" />
                            </Link>
                        </List>
                    </Drawer>
                    <div className={classes.tablecontent}>
                        <Grid
                            container
                            spacing={2}
                            direction="column"
                            justify="flex-start"
                            alignItems="center"
                            className={classes.books}
                        >
                            <Switch>
                                <Route path="/" exact>
                                    <Grid item>
                                        <Books />
                                    </Grid>
                                    <Grid item>
                                        <BookForm
                                            onSubmit={() => true}
                                        ></BookForm>
                                    </Grid>
                                </Route>
                                <Route path="/author" exact>
                                    <Grid item>
                                        <Authors />
                                    </Grid>
                                    <Grid item>
                                        <AuthorForm
                                            onSubmit={() => true}
                                        ></AuthorForm>
                                    </Grid>
                                </Route>
                                <Route path="/" render={() => <div>404</div>} />
                            </Switch>
                        </Grid>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
