const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    ownerName:{
        type: String
    },
    ownerNumber:{
        type: String
    },
    description:{
        type: String
    },
    address:{
        type: String
    },
    price:{
        type: Number
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Property = mongoose.model('Property',propertySchema);

module.exports = Property;