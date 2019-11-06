var express = require('express');
var router = express.Router();
var Category = require('../models/Category.model');
var Products = require('../models/Product.model');

router.get('/', async (req, res) => {
    res.send(await Products.find().populate('category'));
});

router.get('/:id', async (req, res) => {
    let Product = await Products.findById(req.params.id);
    if(Product){
        res.send(await Product);
    } else {
        res.status(404).send({ message: "Specified Product Not found"});
    }
});

router.get('/:id/delete', async (req, res) => {
    await Products.findByIdAndDelete(req.params.id);
    res.send({ message: "Product Deleted sucessfully" });
});

router.post('/', async (req, res) => {
    let category = await Category.findById(req.body.categoryId);
    if(category){
        let newProduct = new Products(req.body);
        newProduct.category = category._id;
        await newProduct.save();
        res.send(newProduct);
    } else {
        res.status(404).send({ message: "Category Not found"});
    }
});

router.post('/:id', async (req, res) => {
    let existingProduct = await Products.findById(req.params.id);
    if(!existingProduct)  res.status(404).send({ message: "Product Not found"});

    let category = await Category.findById(req.body.categoryId);
    if(!category)  res.status(404).send({ message: "Category Not found"});

    for (const key in req.body) {
        if(key == "CategoryId") continue;
        existingProduct[key] = req.body[key];
    }
    existingProduct.category = category._id;
    res.send(existingProduct);
});

module.exports = router;