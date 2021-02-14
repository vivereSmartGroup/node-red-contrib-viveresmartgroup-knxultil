module.exports = function (RED) {
	function KnxUltil(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.inputpayloadtype = config.inputpayloadtype;
		node.outputpayloadtype = config.outputpayloadtype;
		node.devicetype = config.devicetype === undefined ? "Boolean" : config.devicetype;

		function setNodeStatus({ fill, shape, text }) {
			var dDate = new Date();
			node.status({ fill: fill, shape: shape, text: text + " (" + dDate.getDate() + ", " + dDate.toLocaleTimeString() + ")" })
		}

		setNodeStatus({ fill: "green", shape: "ring", text: "Ready" });

		this.on('input', function (msg) {

			if (node.outputpayloadtype === undefined || node.inputpayloadtype === undefined) {
				setNodeStatus({ fill: "red", shape: "dot", text: "Error. Check input and output types" });
				RED.log.error("KnxUltil: " + "Error. Check input and output types. Unable to process the input msg on node id " + node.id);
				return;
			}

			//#region "ADAPT INPUT MESSAGE"
			// #################################################################
			// - node-red-contrib-knx-ultimate
			// - node-red-contrib-homekit-bridged
			// - node-red-contrib-alexa-smart-home
			// - node-red-contrib-deconz

			// 09/02/2020 Check the Input MSG
			let inputMSG = {};
			try {
				switch (node.inputpayloadtype) {
					case "node-red-contrib-knx-ultimate":
						inputMSG = { payload: msg.payload };
						break;
					case "node-red-contrib-homekit-bridged":
						if (node.devicetype === "boolean") inputMSG = { payload: msg.payload.On };
						if (node.devicetype === "temperature") inputMSG = { payload: msg.payload.CurrentTemperature };
						if (node.devicetype === "brightness") {
							if (msg.payload.hasOwnProperty("Brightness")) {
								inputMSG = { payload: msg.payload.Brightness };
							} else {
								inputMSG = { payload: msg.payload.On };
							}
						}
						if (node.devicetype === "cover") inputMSG = { payload: 100 - msg.payload.TargetPosition };
						break;
					case "node-red-contrib-alexa-smart-home":
						if (node.devicetype === "boolean") inputMSG = { payload: msg.payload };
						if (node.devicetype === "temperature") inputMSG = { payload: msg.payload };
						if (node.devicetype === "brightness") inputMSG = { payload: msg.payload };
						if (node.devicetype === "cover") inputMSG = { payload: msg.payload };
						break;
					case "node-red-contrib-knx-deconz":
						inputMSG = { payload: msg.payload };
						break;
					default:
						break;
				}
			} catch (error) {
				setNodeStatus({ fill: "red", shape: "dot", text: "Input: " + error.messages });
				RED.log.error("KnxUltil: " + "Input error on node id " + node.id + ": " + error.messages);
				return;
			}

			// #################################################################
			//#endregion


			//#region "ADAPT OUTPUT MESSAGE"
			// #################################################################
			let outputMSG = RED.util.cloneMessage(msg);
			try {
				switch (node.outputpayloadtype) {
					case "node-red-contrib-knx-ultimate":
						outputMSG = { payload: inputMSG.payload };
						break;
					case "node-red-contrib-homekit-bridged":
						if (node.devicetype === "boolean") outputMSG = { payload: { On: inputMSG.payload } };
						if (node.devicetype === "temperature") outputMSG = { payload: { CurrentTemperature: inputMSG.payload } };
						if (node.devicetype === "brightness") outputMSG = { payload: { On: (inputMSG.payload > 0 ? true : false), Brightness: inputMSG.payload } };
						if (node.devicetype === "cover") outputMSG = { payload: { CurrentPosition: 100 - inputMSG.payload, PositionState: 2 } };
						break;
					case "node-red-contrib-alexa-smart-home":
						if (node.devicetype === "boolean") outputMSG = { acknowledge: true, payload: { state: { power: (inputMSG.payload === true ? 'ON' : 'OFF' ) } } };
						if (node.devicetype === "temperature") outputMSG = { acknowledge: true, payload: { state: { temperature: inputMSG.payload } } };
						if (node.devicetype === "brightness") outputMSG = { acknowledge: true, payload: { state: { brightness: inputMSG.payload } } };
						if (node.devicetype === "cover") outputMSG = { acknowledge: true, payload: { state: { rangeValue: (100 - inputMSG.payload) } } };
						break;
					case "node-red-contrib-deconz":
						outputMSG = { payload: inputMSG.payload };
						break;
					default:
						break;
				}
			} catch (error) {
				setNodeStatus({ fill: "red", shape: "dot", text: "Output: " + error.messages });
				RED.log.error("KnxUltil: " + "Output error on node id " + node.id + ": " + error.messages);
				return;
			}

			// #################################################################
			//#endregion

			setNodeStatus({ fill: "green", shape: "dot", text: node.inputpayloadtype.replace("node-red-contrib-", "") + " -> " + node.outputpayloadtype.replace("node-red-contrib-", "") + " (" + node.devicetype + ")" });
			outputMSG.KNXUltilConversion = { From: node.inputpayloadtype, To: node.outputpayloadtype, Type: node.devicetype };
			outputMSG.topic === undefined ? config.topic || config.name || "" : outputMSG.topic;
			node.send(outputMSG);

		});



		this.on('close', function (removed, done) {
			if (removed) {
				// This node has been deleted
			} else {
				// This node is being restarted
			}
			done();
		});

	}

	RED.nodes.registerType("KnxUltil", KnxUltil);
}