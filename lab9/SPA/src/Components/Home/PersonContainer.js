import React, { Component } from 'react';
import { getPerson } from '../../Data/people';
import Person from './Person';

class PersonContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: undefined,
        };
    }

    async componentDidMount() {
        const person = await getPerson(this.props.match.params.id);
        this.setState({ person });
    }

    async componentWillReceiveProps(nextProps) {
        const person = await getPerson(nextProps.match.params.id);
        this.setState({ person });
    }

    render() {
        if (this.state.person === undefined) return <div>Loading...</div>;

        return <Person person={this.state.person} />
    }
}

export default PersonContainer;
