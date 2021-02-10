import React from 'react';
import Time from './Time';
import { v4 as uuidv4 } from 'uuid';

export default class Clocks extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { clocks: [] };
        this.test = undefined;
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
        //this.clockList();
        
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    handleLocationChange(params) {
        const localZone = params.target.value;
        return localZone;
    }

    handleTimeChange(params) {
        const localTime = Number(params.target.value);
        return localTime;
    }

    handleSubmit(e) {
        e.preventDefault();
        const item = {id: uuidv4(), local: this.handleLocationChange(e), time: this.handleTimeChange(e)};
        this.state.clocks.push(item)
        this.setState({clocks: this.state.clocks});
        this.test = 'test';
    }

    deleteClock(id) {
        console.log(id);
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <h1>Set CLocks</h1>
                <div>{ this.state.time }</div>
                <form id='form'>
                    <input type='text' placeholder='Enter location'  onChange={this.handleLocationChange} />
                    <input type='number' placeholder='Enter time offset' onChange={this.handleTimeChange} />
                </form>
                <button form='form' className='button' onClick={(e) => {this.handleSubmit(e)}}>Add timezone</button>
                <div>
                    { this.state.clocks.length === 0 ? null : this.state.clocks.map((item, index) => <Time item = {item} key={item.id} deleteClock={this.deleteClock} />)}  
                </div>
            </div>
        )
    }
}
