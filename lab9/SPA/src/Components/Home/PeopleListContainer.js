import React, { Component } from 'react';
import { getPeopleList } from '../../Data/people';
import PeopleList from './PeopleList';

class PeopleListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            peopleList: [],
            prevPageNum: undefined,
            nextPageNum: undefined
        };
    }

    async componentDidMount() {
        var prevPageNum;
        var nextPageNum;
        var page = this.props.match.params.page;
        if(this.props.match.params.page === undefined){
            page = 0;
        }
        const peopleList = await getPeopleList(page); 
        var pageNum = page;   
        if(pageNum>0){
            prevPageNum = parseInt(pageNum)-1;
        }else{
            prevPageNum = 0;
        }
        if(pageNum<39){
            nextPageNum = parseInt(pageNum)+1;
        }else{
            nextPageNum=39;
        }
        
        this.setState({ peopleList, prevPageNum, nextPageNum });
    }

    async componentWillReceiveProps(nextProps) {
        var prevPageNum;
        var nextPageNum;
        var pageNum = nextProps.match.params.page;
        if(nextProps.match.params.page === undefined){
            pageNum = 0;
        }
        if(pageNum<0){
            pageNum=0;
        }
        const peopleList = await getPeopleList(pageNum);
        if(pageNum>0){
            prevPageNum = parseInt(pageNum)-1;
        }else{
            prevPageNum = 0;
        }
        if(pageNum<39){
            nextPageNum = parseInt(pageNum)+1;
        }else{
            nextPageNum=39;
        }
        this.setState({peopleList, prevPageNum, nextPageNum});
        
    }

    render() {
        if (this.state.peopleList.length === 0) return <div>Loading...</div>;

        return <PeopleList people={this.state.peopleList} prevPageNum={this.state.prevPageNum} nextPageNum={this.state.nextPageNum}/>
    }
}

export default PeopleListContainer;
