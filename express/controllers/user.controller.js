const db = require('../db')

class USerController {
    async createUser(req, res) {
        const {name, surname} = req.body
        const newPerson = await db.query('INSERT INTO person (name,surname) values ($1,$2) RETURNING *', [name,surname])
        console.log(name, surname)
        res.json(newPerson)
    }

    async getUsers(req, res) {
        res.json({
            "hi": "Bye"
        })
    }

    async getUSer(req, res) {

    }

    async updateUSer(req, res) {

    }

    async deleteUser(req, res) {

    }
}

module.exports = new USerController()