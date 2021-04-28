import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import LeaderBoard from './LeaderBoard';
import Country from './Country';

export default class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <LeaderBoard />
                            )}
                        />
                        <Route
                            exact
                            path="/leader Board"
                            render={() => (
                                <LeaderBoard />
                            )}
                        />
                        <Route
                            exact
                            path="/country/:name"
                            render={(props) => (
                                <Country name={props.match.params.name}/>
                            )}
                        />
                        <Route
                            exact
                            path="/leaderBoard"
                            render={() => (
                                <LeaderBoard />
                            )}
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
}