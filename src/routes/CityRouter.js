var express = require('express');
var cityRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var cityurl = "mongodb+srv://admin:admin@cluster0.ka8dm.mongodb.net/aryabhata?retryWrites=true&w=majority"

function router(menu){

  //http://localhost:8700/city
  cityRouter.route('/')
  .get(function(req,res){
      // creating connection
      mongodb.connect(cityurl,(err,connection)=>{
        if(err){
          res.status(500).send("Error While Connecting")
        }else{
          //connection got created and pass db name
          const dbo = connection.db('aryabhata');
          //make find query to collection
          dbo.collection('city').find({}).toArray((err,data) => {
            if(err){
              res.status(501).send("Error while fetching")
            }else{
              res.render('city',{title:"City Page",citydata:data,menu})
            }
          })
        }
      })
  })

  //http://localhost:8700/city/details
  cityRouter.route('/details/:id')
      .get(function(req,res){
        //var id = req.params.id
        var {id} = req.params
        mongodb.connect(cityurl,(err,connection) => {
          if(err){
            res.status(500).send("Error while connecting")
          }else{
            const dbo = connection.db('aryabhata')
            dbo.collection('city').findOne({_id:id},(err,data)=>{
              if(err){
                res.status(501).send("Error while fetching")
              }else{
                res.render('citylDetails',{title:"City Details Page",citydata:data,menu})
              }
            })
          }
        })
      })
    
   return cityRouter
}

module.exports= router;