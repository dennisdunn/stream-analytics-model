module.exports = function (RED) {
    function Indexer(config) {
        RED.nodes.createNode(this, config);
        var context = this.context();
        var node = this;
        node.idx = 0;
        node.on('input', msg => {
            msg.index = node.idx++;
            node.send(msg);
        });
    }
    RED.nodes.registerType('indexer', Indexer);
}