/**
 * Created by aleksandar.mechkaros on 5/29/2017.
 */
let mongoose = require('mongoose');
let uid = require('uid2');

let GrantCodeSchema = mongoose.Schema({
    code: { type: String, unique: true, default: function() {
        return uid(24);
    }},

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },

    scope: [ { type: String } ],

    redirectUri: { type: String, required: true },

    createdAt: { type: Date, expires: '7d' }
});

module.exports = mongoose.model('GrantCode', GrantCodeSchema);