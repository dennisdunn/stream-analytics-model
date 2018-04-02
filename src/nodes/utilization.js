module.exports = function (RED) {
    function Utilization(config) {
        RED.nodes.createNode(this, config);
        this.threshold = config.threshold;
        this.name = config.name;
        var node = this;
        node.on('input', msg => {
            var context = node.context();
            var state = context.get('state') || { prev: null, total: 1, on: 0, ishigh: false };

            if (state.prev) {
                var deltaT = (msg.timestamp - state.prev);
                state.total += deltaT;
                if (state.ishigh) {
                    state.on += deltaT;
                }
                state.ishigh = msg.payload >= node.threshold;
                msg.payload = state.on / state.total;
                msg.topic = node.name || 'utilization';
            }

            state.prev = msg.timestamp;
            context.set('state', state);
            node.send(msg);
        });
    }
    RED.nodes.registerType('utilization', Utilization);
}