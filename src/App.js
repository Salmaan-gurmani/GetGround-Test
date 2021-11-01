import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BooksContainer from './components/BooksContainer';

import configureStore from './store';

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={BooksContainer} />
                        <Route
                            exact
                            path="/page/:pageNumber"
                            component={BooksContainer}
                        />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
