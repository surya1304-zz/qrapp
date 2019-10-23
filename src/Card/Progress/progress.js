import React from 'react';
import {lighten, makeStyles, withStyles} from '@material-ui/core/styles';
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        backgroundColor: lighten('#e01616', 0.7),
        borderRadius: 20,
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#008c0c',
    },
})(LinearProgress);

export default function LinearStatic( { progress }) {
    const classes = useStyles();
    return (
        <div>
            <BorderLinearProgress
                className={classes.margin}
                variant="determinate"
                value={progress}
            />
        </div>
    );
}