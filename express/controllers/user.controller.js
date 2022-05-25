const db = require('../db')

class USerController {
    async createUser(req, res) {
        const {name, surname} = req.body
        const newPerson = await db.query('INSERT INTO person (name,surname) values ($1,$2) RETURNING *', [name,surname])
        res.json(newPerson.rows)
    }

    async getUsers(req, res) {
        const users = await db.query('SELECT * from person')
        res.json(users.rows)
    }

    async getUSer(req, res) {

    }

    async updateUSer(req, res) {

    }

    async deleteUser(req, res) {
        const id = req.params.id
        const delUser = await db.query(`DELETE FROM person WHERE id = ${id}`)
        res.json(delUser.rows)
    }
}

module.exports = new USerController()