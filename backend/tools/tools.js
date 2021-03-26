const path = require('path')
const fs = require('fs')

exports.generateFile = (fileName,data) =>{
    const array = fileName.split('.')
    const extension = array[array.length-1]
    const random = Math.random() 
    const pathToPublic = path.join(__dirname,'../public')
    fs.writeFile(`${pathToPublic}/random${random}.${extension}`,data,(err)=>{
        if(err) throw err
        console.log('saved')
    }) 
    const imagePath = `http://localhost:8000/random${random}.${extension}`
    return imagePath
}