//import './SingleBook.css';
import React from 'react';
import {
    Link
} from 'react-router-dom'

const Person = ({person}) => (
    <article>
        <h2>Personal Profile</h2>
        <h3>id : {person.id}</h3>
        <h3>name : {person.first_name} {person.last_name}</h3>
        <h3>email : {person.email}</h3>
        <h4>gender : {person.gender}</h4>
        <h4>ip_address : {person.ip_address}</h4>
        <Link to={`/`}>Home</Link>
    </article>

    
);

export default Person;