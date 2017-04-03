import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import PeopleListContainer from './PeopleListContainer';
import PersonContainer from './PersonContainer';

export const Home = () => (
    <Router>
        <div>
            <Route exact path="/" component={PeopleListContainer} />
            <Route path="/archive/:page" component={PeopleListContainer} />
            <Route path="/user/:id" component={PersonContainer} />
        </div>
    </Router>
);