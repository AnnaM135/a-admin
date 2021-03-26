const db = require("../models/models")
const { generateFile } = require('../tools/tools')



exports.getServicesDesc = (req, res) =>{
    db.Information.findAll()
    .then((data) => {
        res.send(data);
    })
    .catch((err) => console.log(err))
}

exports.addServicesDesc = (req, res) =>{
    res.send(req.body)
    // db.ServicesHeader.update({description: req.body.data}, {where: {adminId: req.adminId}})
    //  .then((data) => console.log(data))
    // .catch((err) => console.log(err))
}



exports.addInfo = (req, res) =>{
    const { data, id } = req.body
    if(id == 2){
        
        db.ServicesInfo.create({name_en: data.name, title_en:data.title})
        res.send({message:'ok'})
        return    
    }
    db.ServicesInfo.create({name_hy: data.name, title_hy: data.title})
    res.send({message: "ok"})
 }

 exports.getServicesInfo = (req, res) => {
    db.ServicesInfo.findAll()
    .then((data) => {
        res.send(data);
    })
    .catch((err) => console.log(err))
}


exports.deleteServicesInfo = (req, res) =>{
    db.ServicesInfo.destroy({where: {id: req.body.id}})
    .then((data) => res.send("deleted"))
    .catch((err) => console.log(err))
}



exports.editInfo =  async (req, res) =>{
    const { name, id, data } = req.body
    console.log(id)
    if(id ==2){
        await db.Information.update({info_en:data},{where:{name}})
        res.send({message:'ok'})
        return
    }
    await db.Information.update({info_hy:data},{where:{name}})
    res.send({message:'ok'})   
}


exports.showServicesItem = (req, res) => {
    console.log(req.params.id)
    db.ServicesInfo.findByPk(req.params.id)
    .then((data) => {
        res.send(data)
    })
    .catch((err) => console.log(err))
}



exports.addServicesItem = (req, res) => {
    const { nameOfServices, name_hy, title_hy, name_en, title_en,  lang_id } = req.body
    let arr = []
    console.log(req.files)
    arr = req.files.photo_url.map(elem=>{
        console.log(elem)
       return generateFile(elem.name,elem.data)
    })
    if(lang_id == 2){
        db.Outdoor.create({nameOfServices, name_en, title_en, photo_url:JSON.stringify(arr)})
        res.send({message:'ok'})
        return 
    }
    db.Outdoor.create({nameOfServices, name_hy, title_hy ,photo_url:JSON.stringify(arr)})
    res.send({message:'ok'})
}

exports.showServices = async (req, res) => {
    const {id } = req.params
    console.log(id)
    const data = await db.Outdoor.findOne({where:{nameOfServices:id}})
    res.send({message:'ok',data})
}