'use static'
const express= require('express')
//const bodyParser = require('body-parser')
const bodyParser = require('body-parser')
const mongose= require('mongoose')
const Puentes= require('./models/puente')

const app = express()

const port = process.env.PORT || 3000


const cors = require('cors'); 
app.use(cors());
//https://stackoverflow.com/questions/36878255/allow-access-control-allow-origin-header-using-html5-fetch-api

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
/*
app.get('/hola/:nombre',(req,res) =>
{
    res.send(  "Mensaje : Hola soy "+ req.params.nombre)
})
*/
app.get('/api/puente',(req,res)=>{
    
    Puentes.find({},(err,puente) =>{
        if(err) res.status(500).send('message : Error al leer: '+err)
        if(!puente) return res.status(404).send('No existen puentes')
        //res.send(200, {products:products})
         res.status(200).send(puente)
    })

})
app.get('/api/puente/:puenteId',(req,res)=>{
    let puenteId=req.params.puenteId
    Puentes.findById(isbn,(err, puente)=>{
        if(err) res.status(500).send('message : Error al leer: '+err)
        if(!puente) return res.status(404).send('No existe')
        res.status(200).send({puente})
    })
}) 
app.post('/api/puente',(req,res)=>{
    //console.log(req.body)
   // res.send({message : 'Producto recibido'})
    console.log('POST /api/puente')
    console.log(req.body)
   
    let puente = new  Puentes()
    //puente.id= req.body.id
    puente.numero=req.body.numero
    puente.nombre= req.body.nombre
    puente.calle= req.body.calle
    puente.latitud= req.body.latitud
    puente.longitud= req.body.longitud
   
    
    puente.save((err,puenteStored)=>{
        if(err) res.status(500).send('message : Error al grabar: '+err)
        res.status(200).send({puente:puenteStored})
    })

    
})

app.delete('/api/puente/:puenteId',(req,res)=>{

    let puenteId=req.params.puenteId
    Puentes.findById(puenteId,(err, puente)=>{
        if(err) res.status(500).send({message:'Error al borrar : ${err}'})
        puente.remove(err =>{
            if(err) res.status(500).send('message : Error al borrar : '+err)  
            res.status(200).send({message: 'Regsitro borrdo : '})
        })
      //  if(!product) return res.status(404).send('No existe')
       
    })
})


app.put('/api/puente/:puenteId',(req,res)=>{
    let puenteId = req.params.puenteId
    let registroModificado= req.body;
    Puentes.findByIdAndUpdate(puenteId,registroModificado, (err,puenteUpdated) => {
        if(err) res.status(500).send({message: 'Error al modificar: ${err}'})
        res.status(200).send({puente:puenteUpdated})
    })
    
})
 

//mongose.connect('mongodb://localhost:58140/mydatabase',(err,res)=>{
mongose.connect('mongodb://localhost:27017/mydatabase',(err,res)=>{
    if(err) {
        return console.log("Erroe de conexion ${}")
    }
    console.log('Conexión establecida')

    app.listen(port,()=>{
        console.log(`Api Rest ejecutandose en http:/localhost:${port}`)
    })

})