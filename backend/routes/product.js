const express= require('express');
const router=express.Router();
var {base64decode, base64encode} = require('nodejs-base64')

const cors=require('cors')
router.use(cors())
const checkAuth = require('../middleware/check-auth')



router.get('/', (req,res)=>{
    req.db.collection('home').find({}, function(e, docs){
        res.json(docs)
    })
})

router.post('/', (req,res)=>{
    
    req.db.collection('home').insert(req.body, function(e, doc){
        res.json(doc)
    })

})

router.get('/:productID',(req,res)=>{
    req.db.collection('home').find({_id:req.params.productID}, function(e, docs){
        res.json(docs)
    })
})
router.delete('/:productID',(req,res)=>{
    req.db.collection('home').remove({_id:req.params.productID})
})
router.put('/',(req,res)=>{
    req.db.collection('home').update({_id:req.body._id},{$set:req.body})
})

module.exports=router;