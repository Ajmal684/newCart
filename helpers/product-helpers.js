var db = require('../config/connection')
var collection = require('../config/collections')
const { response } = require('express')
const { ObjectID } = require('mongodb')
var objectId = require('mongodb').ObjectID

module.exports = {
    addProduct: (product, cb) => {
        db.get().collection('product').insertOne(product).then((data) => {
            cb(data.ops[0]._id)
        })
    },


    getAllProducts: () => {
        return new Promise(async(resolve, reject)=> {
            let product=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(product)
        })
    },

    deleteProduct:(prodId) => {
        return new Promise((resolve, reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:ObjectID(prodId)}).then((response) => {
                resolve(response)
            })
        })
    },

    getProductDetails: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(prodId)}).then((product)=>{
                resolve(product)
            })
        })
    },

    updateProduct: (prodId,prodDetails) => {
        return new Promise((resolve,reject)=> {
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectId(prodId)},{
                $set: {
                    Name: prodDetails.Name,
                    Description: prodDetails.Description,
                    Price: prodDetails.Price,
                    Category:prodDetails.Category
                }
            }).then((response)=>{
                resolve()
            })
        })
    }

}