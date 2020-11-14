import './App.css'
import ButtonAppBar from './components/ButtonAppBar'
import SimpleCard from './components/SimpleCard'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'
import AddBookCard from './components/AddBookCard'

const useStyles = makeStyles({
    books: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function App() {
    const classes = useStyles()
    return (
        <div className="App">
            <ButtonAppBar></ButtonAppBar>
            <Grid container spacing={2} className={classes.books}>
                <Grid item>
                    <SimpleCard></SimpleCard>
                </Grid>
                <Grid item>
                    <SimpleCard></SimpleCard>
                </Grid>
                <Grid item>
                    <SimpleCard></SimpleCard>
                </Grid>
                <Grid item>
                    <SimpleCard></SimpleCard>
                </Grid>
                <Grid item>
                    <AddBookCard></AddBookCard>
                </Grid>
            </Grid>
        </div>
    )
}

export default App
