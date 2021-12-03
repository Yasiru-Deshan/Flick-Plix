const router = require('express').Router();

let viewMsg = require('../models/ContactUs');

//View received messages list by Admin
router.route('/viewmsg').get((req, res)=>{

    viewMsg.find().then((allMsg)=>{
        res.json(allMsg);
    }).catch((err)=>{
        console.log(err);
    })
})

//Assign a Status
router.route('/viewmsg/status').post(async(req, res)=>{

    let msgId = req.body.id;

    const addingStatus = req.body.Status;
    try {
        const updateStatus = await viewMsg.findOne({_id:msgId});
        updateStatus.status = addingStatus;
        const updated = await updateStatus.save();

    if(updated){
        res.json("You have assigned a status to a Message");
    }
    } catch (error) {
        console.log(error);
    }

})

//Delete specific message
router.delete('/viewmsg/delete/:id', async(req, res) => {
    const id = req.params.id;
    try {
        await viewMsg.findByIdAndDelete(id);
        res.json(true);
    } catch (error) {
        res.status(400).json(error)
    }
});

module.exports = router;