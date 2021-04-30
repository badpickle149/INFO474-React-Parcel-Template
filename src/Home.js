import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Container,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button 
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ChartCard from './components/ChartCard';

const useStyles = makeStyles({
    header: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "8rem",
        width: "50%",
        textAlign: "center",
        fontSize: "4rem"
    }
});

export default function Home() {
    const classes = useStyles();

    return (
        <Container>
            <Typography className={classes.header} variant="h1" >
                Choose an example below!
            </Typography>
            <ChartCard title="Bar Chart" description="A simple bar chart using React and D3" path="/barchart" />
        </Container>
    )
}
