import './App.css'
import React from 'react'
import ButtonAppBar from './containers/ButtonAppBar'
// import { Grid } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core'
// import ListItem from '@material-ui/core/ListItem'
// import Authors from './components/Authors'
// import Books from './components/Books'
// import List from '@material-ui/core/List'
// import Divider from '@material-ui/core/Divider'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import ListItemText from '@material-ui/core/ListItemText'
// import Drawer from '@material-ui/core/Drawer'
import { BrowserRouter } from 'react-router-dom'
// import Container from '@material-ui/core/Container'

// const drawerWidth = 240

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//     },
//     drawer: {
//         [theme.breakpoints.up('sm')]: {
//             width: drawerWidth,
//             flexShrink: 0,
//         },
//         marginBottom: '10px',
//     },
// appBar: {
//     [theme.breakpoints.up('sm')]: {
//         width: `calc(100% - ${drawerWidth}px)`,
//         marginLeft: drawerWidth,
//     },
// },
//     spacer: theme.mixins.toolbar,

//     menuButton: {
//         marginRight: theme.spacing(2),
//         [theme.breakpoints.up('sm')]: {
//             display: 'none',
//         },
//     },
//     // necessary for content to be below app bar
//     toolbar: theme.mixins.toolbar,
//     drawerPaper: {
//         width: drawerWidth,
//     },
//     content: {
//         flexGrow: 1,
//         padding: theme.spacing(3),
//     },
//     tablecontent: {
//         verticalAlign: 'middle',
//     },
// }))

const App = () => {
    // const classes = useStyles()
    return (
        <div className="App">
            {/* <ButtonAppBar></ButtonAppBar> */}
            <BrowserRouter>
                {/* <Grid item xs={12}>
                        <ButtonAppBar />
                    </Grid> */}
                {/* <div className={classes.root}>
                    <Grid
                        container
                        spacing={2}
                        direction="column"
                        alignItems="center"
                        className={classes.books}
                    >
                        <Grid item>
                            <Drawer
                                className={classes.drawer}
                                variant="permanent"
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                anchor="left"
                            >
                                <div className={classes.toolbar} /> */}
                {/* <h2>BOOKSTORE</h2> */}
                {/* <Divider />

                            </Drawer>
                        </Grid>
                    </Grid>
                </div> */}
                <ButtonAppBar />
            </BrowserRouter>
        </div>
    )
}

export default App
