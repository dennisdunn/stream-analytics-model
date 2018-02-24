module.exports = function (RED) {
    function Mean(config) {
        RED.nodes.createNode(this, config);
        this.size = config.size;
        let node = this;
        node.buffer = [];
        node.on('input', msg => {
            if (Number.isFinite(msg.payload.value)) {
                node.buffer.push(msg.payload.value);
                let total = node.buffer.reduce((a,b) => a + b);
                msg.payload.value = total / node.buffer.length;
                if (node.buffer.length == config.size) {
                    node.buffer.shift();
                }
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType('mean', Mean);
}