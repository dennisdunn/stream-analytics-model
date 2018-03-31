module.exports = function (RED) {
    function Utilization(config) {
        RED.nodes.createNode(this, config);
        this.threshold = config.threshold;
        var node = this;
        node.on('input', msg => {
            var context = node.context();
            var state = context.get('state') || {
                ishigh: false,
                prev: 0,
                total: 0,
                on: 0
            };

            if (state.prev) {
                var deltaT = (msg.timestamp - state.prev);
                state.total += deltaT;
                if (state.ishigh) {
                    state.on += deltaT;
                }
                state.ishigh = msg.payload >= node.threshold;
                state.prev = msg.timestamp;
                context.set('state', state);

                msg.payload = state.on / state.total;
                msg.topic = 'utilization';

                node.send(msg);
            } else {
                state.prev = msg.timestamp;
                context.set('state', state);
            }
        });
    }
    RED.nodes.registerType('utilization', Utilization);
}