import React from 'react';
import Time from './Time';
import { v4 as uuidv4 } from 'uuid';
//создаём компонент на основе класса
export default class Clocks extends React.Component {
    constructor(props) {
        super(props); //обязательная строка
        this.state = { clocks: [] }; //задаём начальное состояние
        this.localZone = undefined;//переменные для хранения значений из инпута
        this.localTime = undefined;//переменные для хранения значений из инпута
        this.handleLocationChange = this.handleLocationChange.bind(this);//избегаем потерю контекста выполнения
        this.handleTimeChange = this.handleTimeChange.bind(this);//избегаем потерю контекста выполнения
        this.deleteClock = this.deleteClock.bind(this);//избегаем потерю контекста выполнения, !!!а также присваение state дочернего компонента!!!
        this.inputTimeRef = React.createRef();//создаем ссылки на инпуты для управления из значениями
        this.inputZoneRef = React.createRef();//создаем ссылки на инпуты для управления из значениями
    }

    componentDidMount() { //компонент смонтировался
        console.log('componentDidMount');
    }

    componentDidUpdate() { //компонент изменился
        console.log('componentDidUpdate')        
    }

    componentWillUnmount() {//компонент удалился
        console.log('componentWillUnmount');
    }

    handleLocationChange(params) { //получаем значения инпута с зоной
        this.localZone = params.target.value;
    }

    handleTimeChange(params) { //получаем значения инпута со временнным смещением
        this.localTime = Number(params.target.value);
    }

    handleSubmit(e) { //сабмит инпутов
        e.preventDefault();
        const item = {id: uuidv4(), local: this.localZone, time: this.localTime};
        this.state.clocks.push(item); //сразу в clocks писать нельзя т.к. push возвращает кол-во эл-ов
        this.setState({clocks: this.state.clocks}); //меняем state
        this.inputZoneRef.current.value = ''; //чистим инпуты
        this.inputTimeRef.current.value = ''; //чистим инпуты
        this.localZone = ''; //чистим переменные, иначе при сабмите в item будут старые значения
        this.localTime = ''; //чистим переменные, иначе при сабмите в item будут старые значения
    }

    deleteClock(id) { //удаляем элемент, id прилетает из дочернего эл-та
        this.setState({ clocks: this.state.clocks.filter((clock) => clock.id !== id) });
    }

    render() {
        return (
            <div className='container'>
                <h1>Set CLocks</h1>
                <div>{ this.state.time }</div>
                <div className='add-box'>
                    <form id='form'>
                        <input type='text' placeholder='Enter location' ref={ this.inputZoneRef } onChange={ this.handleLocationChange } />
                        <input type='number' placeholder='Enter time offset' ref={ this.inputTimeRef } onChange={ this.handleTimeChange } />
                    </form>
                    <button form='form' className='button' onClick={ (e) => {this.handleSubmit(e)} }>Add timezone</button>
                </div>
                <div className='clocks-list'>
                    { this.state.clocks.length === 0 ? null : this.state.clocks.map((item, index) => <Time item = { item } key={ item.id } deleteClock={ this.deleteClock } />)}  
                </div>
            </div>
        )
    }
}
