/**
 * Created by aleksandar.mechkaros on 5/29/2017.
 */
let mongoose = require('mongoose');


let AccessTokenSchema = mongoose.Schema({
    token: { type: String },

    type: { type: String },

    created: { type: Date }
});

module.exports = mongoose.model('AccessToken', AccessTokenSchema);