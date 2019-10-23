import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card,CardContent } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader'
import {Typography} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import './hello.css'

const useStyles = makeStyles({
    card: {
        minWidth: 400,
        maxWidth : '50vw',
        minHeight : 200,
        textAlign : 'end',
        position: 'relative',
        borderRadius : 20,
    },
    title: {
        fontSize: 14,
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: 'black',
    },
    top : {
        position : 'absolute',
        top : 50,
        right : 5,
    },
    button : {
        position : 'absolute',
        bottom : 5,
        left : 4,
    }
});

export default function BlockStats({ row, fmod, cleanStatus, updateDate, updateTime, comments }) {
    const classes = useStyles();

    return (
        <div className='gmd-1'>
            <Card className={classes.card}>
                <CardHeader
                    avatar={<Avatar className={classes.orangeAvatar}>{row}</Avatar>}
                />
                <CardContent className={classes.top}>
                    {
                        // eslint-disable-next-line eqeqeq
                        fmod == 1 ? <Typography variant="h5" component="h2">Row-Type : 40 Module Row</Typography> : <Typography variant="h5" component="h2">Row-Type : 20 Module Row</Typography>
                    }
                    {
                        // eslint-disable-next-line eqeqeq
                        cleanStatus == 1 ? <Typography variant="h5" component="h2">Clean Status : Cleaned</Typography> : <Typography variant="h5" component="h2">Clean Status : Not Cleaned</Typography>
                    }
                    {
                        // eslint-disable-next-line eqeqeq
                        cleanStatus == 1 ? <Typography variant="body2" component="h2"> Update Date : {updateDate} </Typography> : <Typography variant="body2" component="h2">Will be cleaned Soon</Typography>
                    }
                    {
                        // eslint-disable-next-line eqeqeq
                        cleanStatus == 1 ? <Typography variant="body2" component="h2"> Update Time : {updateTime} </Typography> : ''
                    }
                    {
                        // eslint-disable-next-line eqeqeq
                        cleanStatus == 1 ? <Typography variant="body2" component="h2"> Comment : {comments} </Typography> : ''
                    }
                </CardContent>
            </Card>
        </div>
    );
}


