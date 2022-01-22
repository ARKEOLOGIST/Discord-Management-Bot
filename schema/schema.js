const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    start_date: {
        type: String,
    },
    due_date: {
        type: String,
    },
    finish_date: {
        type: String,
    },
    reviewer: {
        type: String,
    },
    coverage_blog: {
        type: String,
    },
    coverage_youtube: {
        type: String,
    }
});

module.exports = mongoose.model('review',schema);