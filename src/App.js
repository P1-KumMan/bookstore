import './App.css'
import React from 'react'
import ButtonAppBar from './ui/ButtonAppBar'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Form } from './ui/Form'
import Authors from './components/Authors'
import Books from './components/Books'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Drawer from '@material-ui/core/Drawer'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

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
                            <Grid item>
                                <Switch>
                                    <Route path="/" exact component={Books} />
                                    <Route
                                        path="/author"
                                        exact
                                        component={Authors}
                                    />
                                    <Route
                                        path="/"
                                        render={() => <div>404</div>}
                                    />
                                </Switch>
                            </Grid>
                            <Grid item>
                                <Form onSubmit={() => true}></Form>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
