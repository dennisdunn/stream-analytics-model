
const target = .75;

var eq = msg.payload.equation;
var t = (target - eq[1]) / eq[0];

var m = context.global.moment;
var now = m(msg.timestamp);
var forecast = m(t);
var delta = m.duration(forecast.diff(now)).asDays();
delta = Math.floor(delta);
if (delta < 0) return null;

msg.payload = +forecast;
msg.topic = 'forecast';
return [
    { timestamp: msg.timestamp, payload: delta },
    msg
];


