import React from 'react';
import { makeStyles,withStyles,lighten } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from "@material-ui/core/LinearProgress";
import ButtonBase from "@material-ui/core/ButtonBase";
import './hello.css';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '50vw',
        maxHeight: '60vw',
        borderRadius : 20,
    },

    cardButton: {
        textAlign: "center"
    },

    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#333333',
    },
    root: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const BorderLinearProgress = withStyles({
    root: {
        height: 7,
        backgroundColor: lighten('#383838', 0.7),
        borderRadius: 20,
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#383838',
    },
})(LinearProgress);

function MaterialCard({ zone,today,rows,accap,dccap,progress,onCardClicked }) {
    const classes = useStyles();
    const hello = `Zone ${zone}`;
    return (
        <div className='gmd-1'>
            <Card className={classes.card} >
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            {zone}
                        </Avatar>
                    }
                    title={hello}
                    subheader={today}
                />
                <ButtonBase className={classes.cardButton} onClick={(e) => onCardClicked(zone,e)}>
                    <CardContent>
                        <Typography variant="h6" color="textPrimary" component="p">
                            Total Rows : {rows}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            DC Cap: {dccap} MW
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            AC Cap: {accap} MW
                        </Typography>
                    </CardContent>
                </ButtonBase>
                <CardActions disableSpacing>
                    <Typography variant='h6' color='textSecondary'>{progress}% Completed</Typography>

                </CardActions>
                <div>
                <BorderLinearProgress
                    className={classes.margin}
                    variant="determinate"
                    value={progress}
                />
            </div>
            </Card>
        </div>
    );
}
export default MaterialCard;
