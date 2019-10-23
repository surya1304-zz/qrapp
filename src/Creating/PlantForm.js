import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import {PlaylistAdd, PlaylistAddCheck} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap : 'wrap',
    },
    textField: {
        margin : 4,
        width : 180,
    },
    div : {
        margin : 10,
    }
}));

export default function PlantForm({ AddHandler,done }) {
    const classes = useStyles();
    const [values, setValues] = useState({
        blockname : '',
        totalrows : 0,
        zone : 0,
        inverter : '',
        smb : '',
        _40mrows : 0,
        _20mrows : 0,
        wp : 0,
    });

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
        console.log(values);
    };

    return (
        <div className={classes.div}>
            <form className={classes.container} autoComplete="off">
                <TextField
                    required
                    id="outlined-required"
                    label="Block Name"
                    className={classes.textField}
                    margin="normal"
                    onChange={handleChange('blockname')}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Total Rows"
                    value={ Number(values._40mrows) + Number(values._20mrows) }
                    className={classes.textField}
                    margin="normal"
                    onChange={handleChange('totalrows')}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Zone"
                    className={classes.textField}
                    margin="normal"
                    onChange={handleChange('zone')}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Inverter"
                    className={classes.textField}
                    margin="normal"
                    onChange={handleChange('inverter')}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="SMB"
                    className={classes.textField}
                    margin="normal"
                    onChange={handleChange('smb')}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="FortyRows"
                    className={classes.textField}
                    margin="normal"
                    onChange={handleChange('_40mrows')}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="TwentyRows"
                    className={classes.textField}
                    margin="normal"
                    onChange={handleChange('_20mrows')}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Watt Power"
                    className={classes.textField}
                    margin="normal"
                    onChange={handleChange('wp')}
                />
                <Button onClick={(e) => AddHandler(values, e)}>
                    <PlaylistAdd/>
                </Button>
                <Button onClick={(e) => done(values, e)}>
                    <PlaylistAddCheck/>
                </Button>
            </form>
        </div>
    );
}