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
    const { nameOfGallery, name_hy, title_hy, name_en, title_en,  lang_id } = req.body
    let arr = []
    console.log(req.files)
    arr = req.files.photo_url.map(elem=>{
        console.log(elem)
        return generateFile(elem.name,elem.data)
    })
    if(lang_id == 2){
        db.Project.create({nameOfGallery, name_en, title_en, photo_url:JSON.stringify(arr)})
        res.send({message:'ok'})
        return 
    }
    db.Project.create({nameOfGallery, name_hy, title_hy ,photo_url:JSON.stringify(arr)})
    res.send({message:'ok'})
}


exports.showProject = async (req, res) =>{
    const {id } = req.params
    console.log(id)
    const data = await db.Project.findOne({where:{nameOfGallery:id}})
    res.send({message:'ok',data})
}
