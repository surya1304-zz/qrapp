import React from 'react';
import { makeStyles,createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'typeface-rubik';
import './hello.css';

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Rubik',
    },
});


const useStyles = makeStyles({
    card: {
        minWidth: '30vw',
        maxWidth : '50vw',
        textAlign : 'initial',
        borderRadius : 20,
        position : 'relative',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    end: {
        position: "absolute",
        right : 15,
        top: 10,
        marginRight : 10,
        fontSize: 20,
    },

    end1: {
        position: "absolute",
        right : 24,
        top: 40,
        marginRight : 10,
        fontFamily : theme.typography.fontFamily,
        border: 2,
        borderColor: 'black',
        borderStyle :"solid",
        padding : 3,
    }
});

export default function ZoneDetails({ block,totalrows,totalmod,inv,smb,fmod,tmod,wp,onButton }) {
    const classes = useStyles();

    return (
        <div className='gmd-1'>
            <MuiThemeProvider theme={theme}>
                <Card className={classes.card}>
                    <Typography className={classes.end} variant='h5'>
                        Block
                    </Typography>
                    <Typography className={classes.end1} variant='h5'>
                        {block}
                    </Typography>
                    <CardContent>
                        <Typography variant='h5'>
                            Total Rows : {totalrows}
                        </Typography>
                        <Typography variant="subtitle2" component="h2">
                            Total Modules : {totalmod}
                        </Typography>
                        <Typography variant='subtitle2'>
                            Inverter : {inv}
                        </Typography>
                        <Typography variant="subtitle2" component="strong">
                            SMB : {smb}
                        </Typography>
                        <br/>
                        <Typography variant="subtitle2" component="strong">
                            40 Module Rows : {fmod}
                        </Typography>
                        <br/>
                        <Typography variant="subtitle2" component="strong">
                            20 Module Rows : {tmod}
                        </Typography>
                        <br/>
                        <Typography variant="subtitle2" component="strong">
                            Watt Power: {wp}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color='primary' size="large" onClick={(e) => onButton(e, block,inv,smb)}>Get Detailed Info</Button>
                    </CardActions>
                </Card>
            </MuiThemeProvider>
        </div>
    );
}
