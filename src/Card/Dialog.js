import React from "react";
import {Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
    useTheme,
    TextField,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    makeStyles,
    Radio
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: theme.spacing(1, 0),
    },
    textfield :{
        paddingBottom : 10,
    }
}));

export default function UpdateValues({ updateIt,open,handleClose }) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        updatedate : '',
        updatetime : '',
        updatestatus : false,
        updatecomments : ''
    });
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    function handleSubmit() {
        updateIt(values);
    }

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
        console.log(values);
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Status Update"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the Info of the Cycle Here
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        className={classes.textfield}
                        id="date"
                        label="Update Date(yyyy-mm-dd)"
                        type="text"
                        fullWidth
                        multiline
                        onChange={handleChange('updatedate')}
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        className={classes.textfield}
                        id="time"
                        label="Update Time(hh:mm:ss)"
                        type="text"
                        fullWidth
                        multiline
                        onChange={handleChange('updatetime')}
                    />
                    <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup
                        aria-label="Clean Status"
                        name="cleanstatus"
                        className={classes.group}
                        onChange={handleChange('updatestatus')}
                    >
                        <FormLabel component="legend">Clean Status</FormLabel>
                        <FormControlLabel value="1" control={<Radio />} label="Cleaned" />
                        <FormControlLabel value="0" control={<Radio />} label="Not Cleaned" />
                    </RadioGroup>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="normal"
                        className={classes.textfield}
                        id="Comments"
                        label="Comments"
                        type="text"
                        fullWidth
                        multiline
                        onChange={handleChange('updatecomments')}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained" autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
