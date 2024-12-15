const mongoose = require('mongoose');

const hashtagsSchema = new mongoose.Schema({
    tag:{
        type:String,
        required:true,
        unique:true,
        maxlength:20,
    },
},{
  timestamps:true,
  collection:'hashtags',
})

const Hashtags = mongoose.model('Hashtags',hashtagsSchema);

module.exports = Hashtags;