module.exports = function (RED) {
    "use strict";

    function Utilization(config) {
        RED.nodes.createNode(this, config);
        this.threshold = Number(config.threshold);
        var node = this;
        var state = { prev: -1, total: 1, on: 0, ishigh: false };

        node.on('input', msg => {
            var global = node.context().global;
            var t = RED.util.getMessageProperty(msg, 'timestamp');
            var v = RED.util.getMessageProperty(msg, 'payload');
            t = Number(t); v = Number(v);
            if (msg.hasOwnProperty('reset')) {
                state = Object.assign({}, { prev: -1, total: 1, on: 0, ishigh: false });
            } else if (!isNaN(t) && !isNaN(v)) {
                node.threshold = global.get('utilization_threshold') || node.threshold;
                if (state.prev >= 0) {
                    var deltaT = (t - state.prev);
                    state.total += deltaT;
                    if (state.ishigh) {
                        state.on += deltaT;
                    }
                    state.ishigh = (v >= node.threshold);
                    RED.util.setMessageProperty(msg, 'payload', state.on / state.total);
                    node.send(msg);
                }
                state.prev = t;
            }
        });
    }
    RED.nodes.registerType('utilization', Utilization);
}




