module.exports = function (RED) {
    function ChartableNode(config) {
        RED.nodes.createNode(this, config);
        var context = this.context();
        var node = this;
        node.on('input', msg => {
            msg.timestamp = msg.payload.timestamp;
            msg.payload = msg.payload.value;
            node.send(msg);
        });
    }
    RED.nodes.registerType('chartable', ChartableNode);
}