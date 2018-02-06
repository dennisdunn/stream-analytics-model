module.exports = function (RED) {
    function Median(config) {
        RED.nodes.createNode(this, config);
        var context = this.context();
        this.size = config.size;
        var node = this;
        node.on('input', msg => {
            if (Number.isFinite(msg.payload)) {
                var buffer = context.get('buffer') || [];
                buffer.push(msg.payload);
                if (buffer.length === node.size) {
                    var vals = buffer.concat();
                    vals.sort((a, b) => a - b);
                    
                    var idx = Math.floor(node.size / 2);
                    msg.payload = vals[idx];

                    buffer.shift();
                }
                context.set('buffer', buffer);
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType('median', Median);
}