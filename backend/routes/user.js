const express= require('express');
const router=express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors=require('cors')
router.use(cors())


router.get('/', (req,res)=>{
    req.db.collection('user').find({}, function(e, docs){
        res.json(docs)
    })
    
})

router.post('/', (req,res)=>{
    var doc
    req.db.collection('user').find({email:req.body.email},function(e,docs){
      if (docs.length===0){
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              console.log(err)
            } else {
                req.db.collection('user').insert({"email":req.body.email, "password": hash, "name": req.body.name}, function(e, doc){
                    res.json(doc)
                })
            }
          });
        
      } else {
          console.log("Exit") 
        }
    })

})

router.post('/login',(req,res)=>{
    req.db.collection('user').find({email:req.body.email}, function(e, docs){
        if (docs.length === 0) {
            console.log("Invalid email")
        } else {
            bcrypt.compare(req.body.password, docs[0].password, (err, result) => {
                if (err) {
                  console.log(err)
                }
                if (result) {
                  const token = jwt.sign(
                    {
                      email: docs[0].email,
                      userId: docs[0]._id
                    },
                    "assignment3",
                    {
                        expiresIn: "1h"
                    }
                  );
                  return res.status(200).json({
                    message: "Auth successful",
                    token: token
                  });
                }
                res.status(401).json({
                  message: "Auth failed"
                });
              });
        }
    })
})



router.get('/login/:email',(req,res)=>{
    req.db.collection('user').find({email:req.params.email}, function(e, docs){
        res.json(docs)
    })
})


module.exports=router;