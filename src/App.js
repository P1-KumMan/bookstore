import './App.css'
import React from 'react'
import ButtonAppBar from './ui/ButtonAppBar'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Form } from './ui/Form'
import Books from './components/Books'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Drawer from '@material-ui/core/Drawer'
import { BrowserRouter, Route } from 'react-router-dom'

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
                <Route path="/" />
            </BrowserRouter>
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
                        <ListItem button key="Books">
                            <ListItemIcon></ListItemIcon>
                            <ListItemText primary="Books" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button key="Author">
                            <ListItemIcon></ListItemIcon>
                            <ListItemText primary="Author" />
                        </ListItem>
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
                            <Books />
                        </Grid>
                        <Grid item>
                            <Form onSubmit={(title, author) => true}></Form>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default App
