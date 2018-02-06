module.exports = function (RED) {
    function Mean(config) {
        RED.nodes.createNode(this, config);
        this.size = config.size;
        let node = this;
        node.buffer = [];
        node.on('input', msg => {
            if (Number.isFinite(msg.payload)) {
                node.buffer.push(msg.payload);
                let total = 0;
                node.buffer.forEach(it => {
                    total += it;
                });
                msg.payload = total / node.buffer.length;
                if (node.buffer.length === node.size) {
                    node.buffer.shift();
                }
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType('mean', Mean);
}