const router = require('express').Router();

let ContactUs = require('../models/ContactUs');

router.route('/contact').post((req, res)=>{

    const fullName = req.body.fullName;
    const email = req.body.email;
    const phoneNo = Number(req.body.phoneNo);
    const message = req.body.message;


    const newContactUs = new ContactUs({

        fullName,
        email,
        phoneNo,
        message
    })

    newContactUs.save().then(()=>{
        res.json("You have sent us a message, Successfully!");

    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;