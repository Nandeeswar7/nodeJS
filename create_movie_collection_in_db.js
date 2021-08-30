const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/genreProject', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to the database"))
    .catch(err => console.log("couldnt connect to the database", err));

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

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true
    }
}));

async function createMovie(title, genre, numberInStock, dailyRentalRate) {
    const movie = new Movie({
        title,
        genre,
        numberInStock,
        dailyRentalRate
    });

    const result = await movie.save();
    console.log(result);
}

createMovie('Terminator', {
    name: 'science fiction',
    code: 'Sci-fi'
}, 0, 0);