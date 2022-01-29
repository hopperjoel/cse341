const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema)


// const mongoDb = require("mongodb");
// const getDb = require("../util/database").getDb;

// const fs = require("fs");
// const path = require("path");
// const Cart = require("./cart");
// const dirName = require("../util/path");
// const p = path.join(dirName, "data", "products.json");

// class Product {
//   constructor(title, price, description, imageURL, id, userId) {
//     this._id = id ? new mongoDb.ObjectId(id) : null;
//     this.userId = userId;
//     this.title = title;
//     this.imageURL = imageURL;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         //console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static deleteById(id) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongoDb.ObjectId(id) })
//       .then((result) => {
//         console.log('product deleted');
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static fetchAll(callback) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(id) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new mongoDb.ObjectId(id) })
//       .next()
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     // getProductsFromFile(products => {
//     //     const product = products.find(p => p.id === id);
//     //     callback(product)
//     // });
//   }
// }

// module.exports = Product;
