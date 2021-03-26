const db = require("../models/models")
const { generateFile } = require('../tools/tools')

exports.addProjectName =  (req, res) =>{
    try{
        const { name_hy, name_en, id } = req.body
        // if(name_hy === '' || name_en === ''){
        //     res.send({message:"inputs are not filled"})
        //     return
        // }
        const { photo_url:{ data, name } } = req.files
        const photo_url = generateFile(name,data)
        if(id == 2){
            db.Galleri.create({name_en,photo_url})
            res.send({message:'ok'})
            return
        }
        db.Galleri.create({name_hy,photo_url})
        res.send({message:"ok"})
    } catch(err){
        res.send({message:'error'})
    }
}

exports.getGalleryInfo = async (req, res) => {
    try{
        const data = await db.Galleri.findAll()
        res.send({data})
    } catch(err){
        res.send({message:'error'})
    }
}

exports.deleteGalleryInfo = (req, res) => {
    db.Galleri.destroy({where: {id: req.body.id}})
    .then((data) => res.send("deleted"))
    .catch((err) => console.log(err))
}

exports.showProjectItem = (req, res) => {
    console.log(req.params.id)
    db.Galleri.findByPk(req.params.id)
    .then((data) => {
        res.send(data)
    })
    .catch((err) => console.log(err))
}

exports.addProjectItem = (req, res) => {
    // const { name_hy, title_hy, name_en, title_en, gallery_id, lang_id } = req.body
    let arr = []
    for(let key in req.files){
        arr = [...arr, req.files[key]]
    }
    // arr = arr.map(elem=>{
    //     return generateFile(elem.name,elem.data)
    // })
    console.log(req.files)
    db.Project.create({...req.body,photo_urls:JSON.stringify(arr)})
    res.send({message:'ok'})
}