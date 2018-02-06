module.exports = function (RED) {
    function Indexer(config) {
        RED.nodes.createNode(this, config);
        var context = this.context();
        var node = this;
        node.idx = 0;
        node.on('input', msg => {
           // var i = context.get('current') || 0;
            msg.index = node.idx++;
           // context.set('current', i);
            node.send(msg);
        });
    }
    RED.nodes.registerType('indexer', Indexer);
}