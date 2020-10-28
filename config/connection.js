const mongoClient = require('mongodb').MongoClient
const state = {
    db: null
}
module.exports.connect = function (cb) {
    const url = 'mongodb://localhost:27017'
    const dbname = 'shopping'

    mongoClient.connect(url, (err, data) => {
        if (err) return done(err)
        state.db = data.db(dbname)
        cb()
    })  
}

module.exports.get = function () {
    return state.db
}