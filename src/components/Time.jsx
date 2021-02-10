import React from 'react';
import getTime from '../services/getTime';

export default class Time extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = '';
        console.log(this.state);
    }

    componentDidMount() {
        console.log('Time componentDidMount');
        this.setClock();
    }

    componentDidUpdate() {
        //console.log('Time componentDidUpdate ');
        //console.log(this.state.clock)
        setInterval((() => {
            this.setClock()
        }), 1000);
    }

    handleClick = () => {
        this.props.deleteClock(this.props.item.id)
    };

    setClock() {
        const localTime = getTime(this.props.item.time);
        if (localTime !== this.state.clock) {
            this.setState({clock: localTime});
        }
    }

    render() {
        return (
            <div data-id={ this.props.item.id }>
                <div>{ this.props.item.local }</div>
                <div>{ this.state.clock }</div>
                <button onClick={this.handleClick}>close</button>
            </div>
        )
    }
}
