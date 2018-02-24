module.exports = function (RED) {
    function Median(config) {
        RED.nodes.createNode(this, config);
        let context = this.context();
        let node = this;
        node.buffer = [];
        node.on('input', msg => {
            if (Number.isFinite(msg.payload.value)) {
                node.buffer.push(msg.payload.value);
                if (node.buffer.length == config.size) {
                    let vals = node.buffer.concat();
                    vals.sort((a, b) => a - b);
                    let idx = Math.floor(config.size / 2);
                    msg.payload.value = vals[idx];
                    node.buffer.shift();
                }
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType('median', Median);
}