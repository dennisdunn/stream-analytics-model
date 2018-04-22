module.exports = function (RED) {
    function Utilization(config) {
        RED.nodes.createNode(this, config);
        this.cfg = config;
        var node = this;
        var initialState = { prev: 0, total: 1, on: 0, ishigh: false };
        node.on('input', msg => {
            var context = node.context();
            if (msg.reset) {
                context.set('state', initialState);
                return null;
            }
            var state = context.get('state') || initialState;
            var deltaT = (msg.timestamp - state.prev);
            state.total += deltaT;
            if (state.ishigh) {
                state.on += deltaT;
            }
            state.ishigh = msg.payload >= node.cfg.threshold;
            msg.payload = state.on / state.total;
            msg.topic = node.cfg.name;
            state.prev = msg.timestamp;
            context.set('state', state);
            node.send(msg);
        });
    }
    RED.nodes.registerType('utilization', Utilization);
}




