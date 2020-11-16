import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

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
    return (
        <Card className={classes.root} key={props.id}>
            <CardContent className={classes.content}>
                <Typography
                    variant="h5"
                    component="h2"
                    className={classes.title}
                >
                    {props.book_name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    by
                </Typography>
                <Typography
                    variant="body2"
                    component="p"
                    className={classes.author}
                >
                    {props.author}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SimpleCard
