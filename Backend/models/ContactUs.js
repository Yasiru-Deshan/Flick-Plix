const mongoose = require('mongoose');

const schema = mongoose.Schema;

const contactUs = new schema({

    fullName : {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNo: {
        type: Number,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: "Not Processed"
    }
},
    { timestamps: true },

);

const ContactUs = mongoose.model("ContactUs", contactUs);

module.exports = ContactUs;