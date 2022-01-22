const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log('In the products page middleware')
    res.render('admin/add-product', {
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
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description
    const product = new Product(title, imageURL, description, price);
    product.save();
    // products.push({ title: req.body.title })
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/product', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/product'
        })
    })
}