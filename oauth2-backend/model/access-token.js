/**
 * Created by aleksandar.mechkaros on 5/29/2017.
 */
var mongoose = require('mongoose');
var AccessTokenSchema = mongoose.Schema({
    token: { type: String },
    type: { type: String },
    created: { type: Date }
});
module.exports = mongoose.model('AccessToken', AccessTokenSchema);
