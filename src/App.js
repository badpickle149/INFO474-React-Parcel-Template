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

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Roboto'
        ]
    }
})

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
                </Switch>
            </Router>
        </ThemeProvider>
    )
}
