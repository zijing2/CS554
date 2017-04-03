import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import BookListContainer from './BookListContainer';
import SingleBookContainer from './SingleBookContainer';

export const Books = () => (
    <Router>
        <div>
            <Route exact path="/books" component={BookListContainer} />
            <Route path="/books/:id" component={SingleBookContainer} />
        </div>
    </Router>
);
