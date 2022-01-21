const items = [];
const fs = require('fs');
const path = require('path');
const dirName = require('../util/path');
const p = path.join(
    dirName, 
    'data', 
    'items.json'
);

const getItemsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return callback([]);
        }
        callback(JSON.parse(fileContent));
    })
}

module.exports = class Items {
    constructor(title) {
        this.title = title;
    }

    // save() {
    //     getProductsFromFile(products => {
    //         products.push(this);
    //         fs.writeFile(p, JSON.stringify(products), (err) => {
    //             console.log(err);
    //         })
    //     });
    //     // fs.readFile(p, (err, fileContent) => {    
    //     //})
    // }
    
    static fetchAll(callback) {
        getItemsFromFile(callback);   
    }

}