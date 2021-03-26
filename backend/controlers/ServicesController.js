const db = require("../models/models")


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
    let arr = []
    for(let key in req.files){
        arr = [...arr, req.files[key]]
    }
    // arr = arr.map(elem=>{
    //     return generateFile(elem.name,elem.data)
    // })
    console.log(req.files)
    db.Specialize.create({...req.body,photo_urls:JSON.stringify(arr)})
    res.send({message:'ok'})
}