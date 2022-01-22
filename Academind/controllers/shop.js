const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
    // const products = adminData.products
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    res.render('shop/product-list', {
                prods: products, 
                pageTitle: 'All Products', 
                path: '/product'
            });
        });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        // const products = adminData.products
        // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
        res.render('shop/index', {
                    prods: products, 
                    pageTitle: 'Shop', 
                    path: '/'
                });
            });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart', 
        path: '/cart'
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout', 
        path: '/checkout'
    })
}