module.exports = function (RED) {
    function Threshold(config) {
        RED.nodes.createNode(this, config);
        this.threshold = config.threshold;
        var node = this;
        node.on('input', msg => {
            if (msg.payload >= node.threshold) {
                node.send(msg);
            }
        });
    }
    RED.nodes.registerType('threshold', Threshold);
}