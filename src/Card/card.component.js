import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Collapse } from "@material-ui/core";

import './card.component.styles.css';

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    dense: {
        marginTop: theme.spacing(2)
    },
    menu: {
        width: 200
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    button: {
        margin: theme.spacing(1)
    }
}));

export default function SimpleCard( { cycle1,plant,set } ) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [value, setValue] = React.useState("0");
    const [year, setYear] = React.useState("0");
    const [cycle, setCycle] = React.useState("0");

    const onOKclicked = () => {
        setExpanded(true);
    };

    const onCancelClicked = () => {
        setExpanded(false);
        document.getElementById('helloworld').style.display = 'none';
    };

    const handleChange = event => {
        setValue(event.target.value);
    };

    const CreateCycle = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/create-cycle",
            {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    plant : plant,
                    startToday : true,
                    duration : value,
                    year : year,
                    cycle : cycle,
                })
            }
        ).then(data => alert('Success'));
        set();
    };

    const handleChangeY = event => {
        setYear(event.target.value);
    };

    const handleChangeC = event => {
        setCycle(event.target.value);
    };

    return (
        <Card id='helloworld' className={classes.card}>
            <CardContent>
                <Typography variant="h5" color="textPrimary">
                    The Cycle {cycle1} has been completed. Do You want to Start it today!
                </Typography>
            </CardContent>
            <CardActions>
                <Button className={classes.expand} onClick={onOKclicked} size="small">
                    Yes
                </Button>
                <Button
                    className={classes.expand}
                    onClick={onCancelClicked}
                    size="small"
                >
                    No
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" color="textPrimary">
                        How Many Days It will Continue
                    </Typography>
                    <TextField
                        id="standard-name"
                        label=" duration"
                        className={classes.textField}
                        value={value}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="ContractYear"
                        className={classes.textField}
                        value={year}
                        onChange={handleChangeY}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Cycle"
                        className={classes.textField}
                        value={cycle}
                        onChange={handleChangeC}
                        margin="normal"
                    />
                </CardContent>
                <CardActions>
                    <Button className={classes.button} variant="contained" onClick={CreateCycle}>
                        Create Cycle
                    </Button>
                </CardActions>
            </Collapse>
        </Card>
    );
}
