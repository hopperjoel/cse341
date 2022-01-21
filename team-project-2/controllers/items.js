const Items = require('../models/items');

exports.getAddProduct = (req, res, next) => {
    console.log('In the products page middleware')
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true });
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
}

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    // products.push({ title: req.body.title })
    res.redirect('/');
};

exports.getItems = (req, res, next) => {
    Items.fetchAll(items => {
    // const products = adminData.products
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    res.render('items', {
                items: items, 
                pageTitle: 'Items', 
                path: '/items',
                hasProducts: items.length > 0,
                activeShop: true,
                productCSS: true
            });
        });
};