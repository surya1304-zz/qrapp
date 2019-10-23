import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {Button, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap : 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
        height : 600,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    bottom : {
        paddingBottom : 20,
    },
    top : {
        paddingTop : 20,
    }
}));

export default function ImageGrid({ tileData,cyc,oncl }) {
    const classes = useStyles();
    const tiles = [];

    // eslint-disable-next-line array-callback-return
    tileData.map((tile,i) => {
        tiles.push(<GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title}/>
            <GridListTileBar
                title={tile.title}
            />
        </GridListTile>);
    });

    return (
        <div>
            <Typography className={classes.bottom} variant='h5' color='primary'>
                Cycle {cyc}
            </Typography>
            <div className={classes.root}>
                <GridList cellHeight={600} className={classes.gridList} cols={2}>
                    {tiles}
                </GridList>
            </div>
            <div className={classes.top}>
                <Button onClick={oncl} variant="contained" className="outlined-button" color="primary">
                    Go Back
                </Button>
            </div>
        </div>
    );
}
