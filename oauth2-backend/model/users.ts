/**
 * Created by aleksandar.mechkaros on 5/29/2017.
 */
/**
 * Created by aleksandar.mechkaros on 5/29/2017.
 */
let mongoose = require('mongoose');
let Hash = require('password-hash');

let UserSchema = mongoose.Schema({

    facebookID: {type: String, unique: true},

    username: {type: String, unique: true},

    firstName: {type: String},

    lastName: {type: String},

    email: {type: String, unique: true},

    password: { type: String, set: function(newValue) {
        return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
    }},

    active_applications: [ { type: String, Number} ]

}, { runSettersOnQuery: true });


module.exports = mongoose.model('User', UserSchema);