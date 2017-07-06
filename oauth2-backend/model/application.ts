/**
 * Created by aleksandar.mechkaros on 5/29/2017.
 */
let uid = require('uid2');
let mongoose = require('mongoose');

let ApplicationSchema = mongoose.Schema({
    title: { type: String, required: true },

    oauth_id: { type: Number, unique: true },

    oauth_secret: { type: String, unique: true, default: function() {
        return uid(42);
    }},

    domains: [ { type: String } ],

    redirectURI: { type: String },

    allowed_domains: [ { type: String} ]
});


module.exports = mongoose.model('Application', ApplicationSchema);