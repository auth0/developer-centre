var mongoose          = require('mongoose'),
    clientSchema    =  mongoose.Schema({
    client_name:      { type: String },
    redirect_uris:    { type: [], required: true},
    client_id:        { type: String, default: 'xxxxx' },
    client_secret:    { type: String, default: 'xxxxx' },
    createdBy:        { type: String, required: true },
    created_on:       { type: Date, default: Date.now },
    updated_on:       { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', clientSchema, 'clients');