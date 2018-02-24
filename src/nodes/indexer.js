module.exports = function (RED) {
    function Indexer(config) {
        RED.nodes.createNode(this, config);
        var context = this.context();
        var node = this;
        node.idx = 0;
        node.on('input', msg => {
            if (msg.payload == "reset") {
                node.idx = 0;
                return null;
            }
            msg.n = node.idx++;
            node.send(msg);
        });
    }
    RED.nodes.registerType('indexer', Indexer);
}