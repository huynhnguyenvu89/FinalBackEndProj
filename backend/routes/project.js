const express= require('express');
const router=express.Router();
const checkAuth = require('../middleware/check-auth')

const cors=require('cors')
router.use(cors())


router.get('/', (req,res)=>{
    req.db.collection('project').find({}, function(e, docs){
        res.json(docs)
    })
})

router.post('/', (req,res)=>{
    
    req.db.collection('project').insert(req.body, function(e, doc){
        res.json(doc)
    })

})

router.get('/:projectID',(req,res)=>{
    req.db.collection('project').find({_id:req.params.projectID}, function(e, docs){
        res.json(docs)
    })
})
router.delete('/:projectID',(req,res)=>{
    req.db.collection('project').remove({_id:req.params.projectID})
})
router.put('/',(req,res)=>{
    req.db.collection('project').update({id:req.body.id},{$set:req.body})
})

module.exports=router;