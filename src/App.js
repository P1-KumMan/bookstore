import './App.css'
import React from 'react'
import ButtonAppBar from './containers/ButtonAppBar'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
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
        marginBottom: '10px',
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
    tablecontent: {
        verticalAlign: 'middle',
    },
}))

const App = () => {
    const classes = useStyles()
    return (
        <div className="App">
            <BrowserRouter>
                <ButtonAppBar />
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    className={classes.books}
                >
                    <div className={classes.root}>
                        <Grid item>
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
                                    <ListItem
                                        button
                                        key="ojd"
                                        component={Link}
                                        to="/"
                                    >
                                        <ListItemIcon></ListItemIcon>
                                        <ListItemText primary="Books" />
                                    </ListItem>
                                </List>
                                <Divider />
                                <List>
                                    <ListItem
                                        button
                                        key="ojd"
                                        component={Link}
                                        to="/author"
                                    >
                                        <ListItemIcon></ListItemIcon>
                                        <ListItemText primary="Authors" />
                                    </ListItem>
                                </List>
                            </Drawer>
                        </Grid>
                        <Grid item verticalAlign="middle">
                            <div className={classes.tablecontent}>
                                <Switch>
                                    <Route path="/" exact>
                                        <Grid item>
                                            <Books />
                                        </Grid>
                                    </Route>
                                    <Route path="/author" exact>
                                        <Grid item>
                                            <Authors />
                                        </Grid>
                                    </Route>
                                    <Route
                                        path="/"
                                        render={() => <div>404</div>}
                                    />
                                </Switch>
                            </div>
                        </Grid>
                    </div>
                </Grid>
            </BrowserRouter>
        </div>
    )
}

export default App
