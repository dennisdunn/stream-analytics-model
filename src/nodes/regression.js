module.exports = function (RED) {
    function Regression(config) {
        RED.nodes.createNode(this, config);
        this.cfg = config;
        let node = this;
        node.on('input', msg => {
            var regression = node.context().global.regression;
            if (Array.isArray(msg.payload)) {
                const inputs = msg.payload.map(msg => [msg.timestamp, msg.payload]);
                node.send({
                    topic: 'regression',
                    payload: regression.linear(inputs, {
                        order: 2,
                        precision: 16,
                    }),
                    timestamp: msg.timestamp
                });
            }
        });
    }
    RED.nodes.registerType('regression', Regression);
}


