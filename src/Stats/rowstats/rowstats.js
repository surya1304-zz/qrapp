import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Card, CardContent} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardActions from "@material-ui/core/CardActions";
import './hello.css';
import UpdateValues from "../../Card/Dialog";

const useStyles = makeStyles({
    card: {
        minWidth: '25vw',
        maxWidth : '40vw',
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
    },
    button1 : {
        position : 'absolute',
        bottom : 45,
        left : 0,
    }
});

export default function RowStats({ cycle, plant, date, zone, row, block, inverter, smb, cleanStatus, updateDate, updateTime, getinfo }) {
    const classes = useStyles();
    const [open,setOpen] = useState(false);

    function handleClose() {
        setOpen(false);
    }

    function handleOpen() {
        setOpen(true);
    }

    function setInfo(values){
        setOpen(false);
        fetch("http://localhost:3000/cycleStats",{
            method : 'put',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                plant : plant,
                date : date,
                zone : zone,
                row : row,
                block : block,
                inverter : inverter,
                SMB : smb,
                cycle : cycle,
                newdate : values.updatedate,
                newStatus : Number(values.updatestatus),
                newTime : values.updatetime,
                newComment : values.updatecomments
            }),
        }).then(res =>res.json())
            .then(quill => console.log(quill));
    }

    return (
        <div className='gmd-1'>
            <UpdateValues open={open} updateIt={setInfo} handleClose={handleClose}/>
            <Card className={classes.card}>
                <CardHeader
                    avatar={<Avatar className={classes.orangeAvatar}>{cycle}</Avatar>}
                />
                <CardContent className={classes.top}>
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
                </CardContent>
                <CardActions>
                    {
                        // eslint-disable-next-line eqeqeq
                        cleanStatus == 1 ? <Button onClick={(e)=>getinfo(cycle,e)} color="primary" className={classes.button}>Get More Info</Button> : ''
                    }
                    {
                        // eslint-disable-next-line eqeqeq
                        (sessionStorage.getItem('role') === 'admin') ? <Button onClick={handleOpen} color="secondary" className={classes.button1}>Edit The Info</Button> : ''
                    }
                </CardActions>
            </Card>
        </div>
    );
}