import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Button } from '@material-ui/core'
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
const handledelete = (props) => {
    Api.delete(`books/${props.id}`).then((res) => {
        console.log(res)
    })
}
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
                {/* <Button
                    variant="outlined"
                    color="secondary"
                    onClick={(props) => handledelete}
                >
                    Secondary
                </Button> */}
            </CardContent>
        </Card>
    )
}

export default SimpleCard
