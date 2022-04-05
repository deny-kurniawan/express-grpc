const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
});

mongoose.connection.on('error', error => {
    console.log('database connection error: ', error);
});

module.exports = mongoose;