const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

/*const answerSchema = new Schema({
    answer: String,
    number: Number
})*/

const voteSchema = new Schema({
    question: String,
    option: String,
    answers: [{
        answer: String,
        number: Number
        }]
});

autoIncrement.initialize(mongoose.connection);
voteSchema.plugin(autoIncrement.plugin, {
    model: 'vote',
    field: 'id',
    startAt: 0,
    incrementBy: 1,
    unique: true
});

module.exports = mongoose.model('vote', voteSchema);