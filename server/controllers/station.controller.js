const db = require("../db");

const Station = db.station

exports.getStations = async (req, res) => {
    const stations = await Station.findAll({include: {all: true}})
    res.status(200).send({
        stations
    })
}
