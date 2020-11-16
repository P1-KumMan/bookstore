import { React, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
// import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
// import { TextField } from '@material-ui/core'
// import Button from '@material-ui/core/Button'

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
    button: {
        alignItems: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
    },
})

const useInputValue = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    return {
        value,
        onChange: (e) => setValue(e.target.value),
        resetValue: () => setValue(''),
    }
}

export const Form = ({ onSubmit }) => {
    const classes = useStyles()
    const titile = useInputValue('')
    const author = useInputValue('')
    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            onSubmit(titile.value, author.value)
                            titile.resetValue()
                            author.resetValue()
                        }}
                    >
                        <label>Book Name</label>
                        <input {...titile} />
                        <br></br>
                        <label>Author</label>
                        <input {...author} />

                        <br></br>
                        <button type="submit">submit</button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
