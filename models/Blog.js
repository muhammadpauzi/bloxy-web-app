const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    markdown: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    views: {
        type: Number,
        default: 0
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
}, { timestamps: true });

// validate used for the slug and the sanitizedHtml is not error (required) because the slug and the sanitizedHtml is empty
BlogSchema.pre('validate', async function (next) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    next();
})

module.exports = mongoose.model('Blog', BlogSchema);