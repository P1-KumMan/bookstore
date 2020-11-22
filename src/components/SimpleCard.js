import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Api from '../Api'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        height: 350,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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
    button: {},
})

const SimpleCard = (props) => {
    console.log(props.id)
    const classes = useStyles()
    return (
        <Card className={classes.root} key={props._id}>
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
