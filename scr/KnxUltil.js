module.exports = function (RED) {
	function KnxUltil(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.config = config;
		node.jSonStates = {}; // JSON object containing the states. 
		

		this.on('input', function (msg) {

			// 28/08/2020 inform user about undefined topic or payload
			if (!msg.hasOwnProperty("topic") || typeof (msg.topic) == "undefined") {
				setNodeStatus({ fill: "red", shape: "dot", text: "Received invalid topic!" });
				return;
			}
			// 28/08/2020 inform user about undefined topic or payload
			if (!msg.hasOwnProperty("payload") || typeof (msg.payload) == "undefined") {
				setNodeStatus({ fill: "red", shape: "dot", text: "Received invalid payload!" });
				return;
			}
			var topic = msg.topic;
			var payload = msg.payload;
			

		});

		this.on('close', function (removed, done) {
			if (removed) {
				// This node has been deleted
			} else {
				// This node is being restarted
			}
			done();
		});

		
		function setNodeStatus({ fill, shape, text }) {
			var dDate = new Date();
			node.status({ fill: fill, shape: shape, text: text + " (" + dDate.getDate() + ", " + dDate.toLocaleTimeString() + ")" })
		}

		
	}

	RED.nodes.registerType("KnxUltil", KnxUltil);
}