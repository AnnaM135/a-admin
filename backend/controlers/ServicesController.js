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

// exports.getData = async (req,res) =>{
// console.log(req.body)
//     // const { name, id } = req.body
//     // const response = await db.Information.findOne({where:{name}})
//     // if(id === 2){
//     //     res.send({data:response.info_en})
//     //     return
//     // }
//     // res.send({data:response.info_hy})
// }

