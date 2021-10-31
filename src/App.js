import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BooksContainer from './components/BooksContainer';

import configureStore from './store';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
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
                            path="/user/:pageNumber"
                            component={BooksContainer}
                        />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
