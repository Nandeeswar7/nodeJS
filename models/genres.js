
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50
    },
    code: {
        type: String,
        required: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);




exports.genreSchema = genreSchema;
exports.Genre = Genre;