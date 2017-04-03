import React from 'react';
import {
    Link
} from 'react-router-dom'

const PeopleList = ({ people, prevPageNum, nextPageNum }) => (
    <div>
        <h3>People List</h3>
        {people.map((person, index) => (
            <article key={index}>
                <header>
                    <h4><Link to={`/user/${person.id}`}>{person.id} | {person.first_name} {person.last_name} | {person.email}</Link></h4>
                    {/*<h5>{person.email}</h5>*/}
                </header>
            </article>
        ))}
            <Link to={`/archive/${prevPageNum}`}>previous</Link>
            <br></br>
            <Link to={`/archive/${nextPageNum}`}>next</Link>
    </div>
);

export default PeopleList;