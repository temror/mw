const db = require("../models");

const Place = db.place
const User = db.user

exports.getPlaces = async (req, res) => {
    const places = await Place.findAll({include: {all: true}})
    res.status(200).send({
        places
    })
}
exports.createPlace = async (req, res) => {
    try {
        const {title,text,image} = req.body.body
        const place = await Place.create({ title, text, image})
        res.status(200).send({
            mes: place
        })
    } catch (e) {
        res.status(400).send({
            mes: 'ne ok'
        })
    }
}
exports.deletePlace = async (req,res) =>{
    try{
        const id = req.params.id
        const place = await Place.findOne({where:{id: id}})
        await place.destroy()
        res.status(200).send({
            mes: place
        })
    }
    catch (e) {
        res.status(400).send({
            mes: 'ne ok'
        })
    }
}