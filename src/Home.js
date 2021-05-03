import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Container,
    Typography,
} from '@material-ui/core';
import ChartCard from './components/ChartCard';
import { types } from './charts';

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
    const cards = types.map((d) => {
        return <ChartCard 
            title={d.name} 
            description={d.description} 
            path={d.path}
            link={d.link}
            />;
    });

    return (
        <Container>
            <Typography className={classes.header} variant="h1" >
                Choose an example below!
            </Typography>
            {cards}
        </Container>
    )
}
