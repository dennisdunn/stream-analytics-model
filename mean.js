module.exports = function (RED) {
    function Mean(config) {
        RED.nodes.createNode(this, config);
        var context = this.context();
        this.size = config.size;
        var node = this;
        node.on('input', msg => {
            if (Number.isFinite(msg.payload)) {
                var buffer = context.get('buffer') || [];
                buffer.push(msg.payload);
                var total = 0;
                buffer.forEach(it => {
                    total += it;
                });
                msg.payload = total / buffer.length;
                if (buffer.length === node.size) {
                    buffer.shift();
                }
                context.set('buffer', buffer);
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType('mean', Mean);
}