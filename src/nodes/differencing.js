module.exports = function (RED) {
    function Differencing(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        let prev = 0;
        node.on('input', msg => {
            const cur = msg.payload;
            msg.payload -= prev;
            prev = cur;

            node.send(msg);
        });
    }
    RED.nodes.registerType('differencing', Differencing);
}