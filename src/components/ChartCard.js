import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    card: {
        marginBottom: "2rem"
    }
});

export default function ChartCard(props) {
    const { title, description, path } = props;
    const classes = useStyles();

    return (
        <div className={classes.card}>
            <Card>
                <CardContent>
                    <Typography variant="h3">{title}</Typography>
                    <Typography variant="body1">{description}</Typography>
                </CardContent>
                <CardActions>
                    <Link to={path}>
                        <Button variant="contained" color="primary">See example</Button>
                    </Link>
                </CardActions>
            </Card>
        </div>
    )
}
