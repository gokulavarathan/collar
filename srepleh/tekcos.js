var socket = 0;
const queryhelper = require('../srepleh/yreuq');
const mongoose = require('mongoose');
const token = require('../ledom/nekot');

module.exports.initiate = (socketio) => {
	socket = socketio;


}

module.exports.sendmessage = (method, message) => {

	try {
		socket.sockets.emit(method, message)

	} catch (e) {
		console.log(e)
	}

}

module.exports.receivemessage = (method) => {
	console.log("emit responsefront", method)
	socket.sockets.on(method, (message) => {
		console.log("emit responsefront", message)

		return message
	})

}

module.exports.roomConnection = async (e, data1, callback) => {
	// {"FinalFirstCharacterid":"63018d74c7e107827122dded","FinalSecondCharacterid":"62f627db2c62c1cc06976d39","FinalThirdCharacterid":"62f08833ce3d7da3d51a5e7e"} paramsFinalizedCharacters
	try {
		console.log(data1, "data1")


		queryhelper.findData('unitySchema', {}, {}, {}, 0, async (getData) => {

			if (getData != undefined && getData.length != 0) {
				console.log(getData, "getData")

				var total = getData.length;
				var data = getData[total - 1];
				console.log(data, "data")
				console.log(data.playList.length == 1, "data.playList.length == 1")

				console.log(data.playList[0] != data1.userAddress, "data.playList[0] != data1.userAddress")

				if (data.playList.length == 1 && data.playList[0] != data1.userAddress) {
					var ids = [data1.FinalFirstCharacterid, data1.FinalSecondCharacterid, data1.FinalThirdCharacterid]
					const records = await token.find({ '_id': { $in: ids } });


					if (data.status == "Active") {

						var value = {
							"playList": [data.playList[0], data1.userAddress],
							"roomNumber": data.roomNumber,
							"status": "Lock",
							"firstPlayerData": data.firstPlayerData,
							"secondPlayerData": records
						}

						queryhelper.updateData('unitySchema', 'one', { "_id": mongoose.Types.ObjectId(data._id) }, value, async (status, err) => {
							if (status) {
								console.log(status, "status")

								callback(value)

							} else {
								console.log("updated error", e)
							}
						})
					} else {
						var value = {
							"playList": [data1.userAddress],
							"roomNumber": data.roomNumber + 1,
							"status": "Active",
							"firstPlayerData": records,
							"secondPlayerData": []
						}

						queryhelper.updateData('unitySchema', 'one', { "_id": mongoose.Types.ObjectId(data._id) }, value, async (status, err) => {
							if (status) {
								console.log(status, "status")

								callback(value)

							} else {
								console.log("updated error", e)
							}
						})
					}

				} else {
					var ids = [data1.FinalFirstCharacterid, data1.FinalSecondCharacterid, data1.FinalThirdCharacterid]
					const records = await token.find({ '_id': { $in: ids } });
					var input = {
						"playList": [data1.userAddress],
						"roomNumber": data.roomNumber + 1,
						"status": "Active",
						"firstPlayerData": records,
						"secondPlayerData": []
					}
					queryhelper.insertData('unitySchema', input, async (success, err) => {

						callback(input)


					})
				}
			} else {
				//var ids=["61d43f8b05d46866fe91dd72","61d53eeb05d46866fe91ddb0","61d541c505d46866fe91ddb6"]	

				var ids = [data1.FinalFirstCharacterid, data1.FinalSecondCharacterid, data1.FinalThirdCharacterid]
				const records = await token.find({ '_id': { $in: ids } });
				var input = {
					"playList": [data1.userAddress],
					"roomNumber": 1,
					"status": "Active",
					"firstPlayerData": records,
					"secondPlayerData": []
				}
				queryhelper.insertData('unitySchema', input, async (success, err) => {
					console.log("s", success, "er", err)

					callback(input)


				})
			}


		})
	} catch (e) {
		console.log("error", e)
	}
}


module.exports.rommList = (e, response) => {

	try {
		var availableRooms = [];
		var rooms = e.sockets.adapter.rooms;
		console.log(rooms, "rooms")

		if (rooms) {
			for (var room in rooms) {
				if (!rooms[room].hasOwnProperty(room)) {
					availableRooms.push(room);
				}
			}
		}
		console.log(response, "response")

		const clients = e.sockets.adapter.rooms.get(response);
		const numClients = clients ? clients.size : 0;
		console.log(clients, "clients")
		console.log(numClients, "numClients")
		console.log(availableRooms, "availableRooms")


	} catch (e) {
		console.log("error", e)
	}
}

module.exports.playerData = async (e, response, callback) => {


	// const records = await token.find({ '_id':'61d43f8b05d46866fe91dd72'  });
	console.log(records, "rescords")
}
