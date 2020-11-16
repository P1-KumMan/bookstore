import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        height: 350,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 600,
    },
    pos: {
        marginBottom: 12,
    },
    author: {
        fontStyle: 'italic',
    },
})

const SimpleCard = (props) => {
    const classes = useStyles()
    const book_name = 'Book Name'
    const author = 'Auther Name '

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Typography
                    variant="h5"
                    component="h2"
                    className={classes.title}
                >
                    {this.props.book_name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    by
                </Typography>
                <Typography
                    variant="body2"
                    component="p"
                    className={classes.author}
                >
                    {this.props.author}
                </Typography>
            </CardContent>
        </Card>
    )
}
const mapStateToProps = (state) => {
    return {
        book_id: state.book.id,
        book_name: state.book.name,
        author: state.book.author,
    }
}
export default connect(mapStateToProps)(SimpleCard)
