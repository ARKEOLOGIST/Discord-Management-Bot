const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    due_date: {
        type: String,
        required: true
    },
    finish_date: {
        type: String,
        required: true
    },
    reviewer: {
        type: String,
        required: true
    },
    coverage_blog: {
        type: String,
        required: true
    },
    coverage_youtube: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('review',schema);