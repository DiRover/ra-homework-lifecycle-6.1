import React from 'react';
import getTime from '../services/getTime';

export default class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = '';//начальное значение state
        this.interval = '';//для дальнейшей записи и удаления интервала
    }

    componentDidMount() {
        console.log('Time componentDidMount');
        this.setClock(); //получаем первое значение времени, больше componentDidMount не сработает
    }

    componentDidUpdate() {
        console.log('Time componentDidUpdate ');
        this.interval = setInterval((() => { //записываем фун-ю с интервалом
            this.setClock()
        }), 1000); 
    }

    setClock() {
        const localTime = getTime(this.props.item.time);//передаём getTime смещение времени
        if (localTime !== this.state.clock) { //обязательно надо прописать, иначе всё зависнит, необходимое сравнение, часто state не успевает обновляться
            this.setState({clock: localTime}); //перезаписываем state
        }
    }

    componentWillUnmount() {
        console.log('Time componentWillUnmount');
        clearInterval(this.interval);//удаляем интервал после удаления компонента, иначе происходит утечка памяти
    }

    render() {
        return (
            <div data-id={ this.props.item.id } className='clock'>
                <div>{ this.props.item.local }</div>
                <div>{ this.state.clock }</div>
                <button onClick={() => {this.props.deleteClock(this.props.item.id)}}>close</button>
            </div>
        )
    }
}
