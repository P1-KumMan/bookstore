import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import Authors from '../components/Authors'
import Books from '../components/Books'
import { Route, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import PersonIcon from '@material-ui/icons/Person'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: 'flex',
    // },
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
        alignContent: 'center',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        // marginTop: `calc(100% - ${drawerWidth}px)`,
        marginTop: `${drawerWidth}`,
        paddingTop: '8rem',
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

function ResponsiveDrawer(props) {
    const { window } = props
    const classes = useStyles()
    const theme = useTheme()
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button key="ojd" component={Link} to="/">
                    <ListItemIcon>
                        {' '}
                        <LibraryBooksIcon />{' '}
                    </ListItemIcon>
                    <ListItemText primary="Books" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key="ojd" component={Link} to="/author">
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Authors" />
                </ListItem>
            </List>
        </div>
    )

    const container =
        window !== undefined ? () => window().document.body : undefined

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" noWrap>
                        Bookstore
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <Container className={classes.content}>
                <div className={classes.toolbar} />
                <Grid>
                    <Grid>
                        <div className={classes.tablecontent}>
                            <Switch>
                                <Route path="/" exact>
                                    <Grid item xs={12}>
                                        <Books />
                                    </Grid>
                                </Route>
                                <Route path="/author" exact>
                                    <Grid item>
                                        <Authors />
                                    </Grid>
                                </Route>
                                <Route path="/" render={() => <div>404</div>} />
                            </Switch>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default ResponsiveDrawer
