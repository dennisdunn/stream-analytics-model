module.exports = function (RED) {
    function Window(config) {
        RED.nodes.createNode(this, config);
        this.size = config.size;
        this.rolling = config.rolling;
        let node = this;
        node.on('input', msg => {
            var context = node.context();
            var state = context.get('state') || [];
            state.push(msg);
            if (state.length === +node.size) {
                node.send({
                    topic: 'window',
                    payload: state.concat(),
                    timestamp: msg.timestamp
                });
                if (node.rolling) {
                    state.shift();
                } else {
                    state = undefined;
                }
            }
            context.set('state', state);
        });
    }
    RED.nodes.registerType('window', Window);
}