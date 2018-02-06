module.exports = function (RED) {
    function Median(config) {
        RED.nodes.createNode(this, config);
        let context = this.context();
        this.size = config.size;
        let node = this;
        node.buffer = [];
        node.on('input', msg => {
            if (Number.isFinite(msg.payload)) {
                node.buffer.push(msg.payload);
                if (node.buffer.length === node.size) {
                    let vals = node.buffer.concat();
                    vals.sort((a, b) => a - b);
                    
                    let idx = Math.floor(node.size / 2);
                    msg.payload = vals[idx];

                    node.buffer.shift();
                }
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType('median', Median);
}