const db = require("../models");

const Place = db.place
const User = db.user
const Image = db.image

exports.getPlaces = async (req, res) => {
    const places = await Place.findAll({include: {all: true}})
    res.status(200).send({
        places
    })
}
exports.createPlace = async (req, res) => {
    try {
        const {title,text,images} = req.body.body
        const place = await Place.create({ title, text})
        let imagesArr = []
        for(let i =0;i<images.length;i++){
            const image = await Image.create({image: images[i]})
            imagesArr.push(image)
        }
        await place.addImages(imagesArr)
        res.status(200).send({
            mes: await Place.findAll({include: {all: true}})
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