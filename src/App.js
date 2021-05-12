import React from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './Home';
import 'fontsource-roboto';
import { 
    createMuiTheme,
    ThemeProvider 
} from '@material-ui/core/styles';
import BarChart from './charts/Barchart';
import Axes from './charts/Axes';
import Scatterplot from './charts/Scatterplot';
import Map from './charts/Map';
import Tooltip from './charts/Tooltip';
import Linechart from './charts/Linechart';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Roboto'
        ]
    }
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>    
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/barchart">
                        <BarChart />
                    </Route>
                    <Route exact path="/axes">
                        <Axes />
                    </Route>
                    <Route exact path="/scatter-plot">
                        <Scatterplot />
                    </Route>
                    <Route exact path="/map">
                        <Map />
                    </Route>
                    <Route exact path="/tooltip">
                        <Tooltip />
                    </Route>
                    <Route>
                        <Linechart />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    )
}
