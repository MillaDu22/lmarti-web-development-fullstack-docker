const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    informations: { type: String, required: true },
    tags: [{ type: String }],
    description: { type: String, required: true },
    cover: [{ type: String, required: true }],
    photos: [{ type: String, required: true }],
    code: [{ type: String, required: true }],
    site: [{ type: String, required: true }],
    alt: { type: String, required: true },
    html: { type: Number, required: true },
    css: { type: Number, required: true },
    js: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
