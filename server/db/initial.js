const db = require("./index")
const Role = db.role
const Station = db.station
const Color = db.metrocolor

const initial = async () =>{
    await Role.create({
        id: 1,
        name: "user"
    });

    await Role.create({
        id: 2,
        name: "admin"
    })
    const stations = require('./data/metro')
    for (const s of stations) {
        const line = await Color.create({
            title: s.line.title,
            color: s.line.color,
            number: s.line.number
        })
        for (const st in s.stations) {
            await line.createStation({
                title: s.stations[st]
            })

        }
    }
}

module.exports = initial
