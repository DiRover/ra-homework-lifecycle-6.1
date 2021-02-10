import moment from 'moment';

export default function getTime(hour = 0) {
    const time = moment().utcOffset(hour).format('HH:mm:ss');
    //console.log(time);
    return time;
}
