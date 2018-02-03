module.exports = function (RED) {
    function Indexer(config) {
        RED.nodes.createNode(this, config);
        var context = this.context();
        var node = this;
        node.on('input', msg => {
            var i = context.get('indexer-state') || 0;
            msg.index = i++;
            context.set('indexer-state', i);
            node.send(msg);
        });
    }
    RED.nodes.registerType('indexer', Indexer);
}