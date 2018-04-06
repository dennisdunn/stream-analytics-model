module.exports = function (RED) {
    function Window(config) {
        RED.nodes.createNode(this, config);
        this.size = config.size;
        let node = this;
        node.buffer = [];
        node.on('input', msg => {
            node.buffer.push(msg.payload);
            if (node.buffer.length == node.size) {
                msg.payload = node.buffer.concat();
                node.buffer = [];
                node.send(msg);
            }
        });
    }
    RED.nodes.registerType('window', Window);
}