import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        alignItems: 'center',
    },
})

export default function AddBookCard() {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Add Books
                </Typography>
                <AddCircleRoundedIcon></AddCircleRoundedIcon>
            </CardContent>
        </Card>
    )
}
