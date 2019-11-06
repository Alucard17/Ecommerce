var express = require('express');
var router = express.Router();
var Category = require('../models/Category.model');
var withPagination = require('../utils/HOfuncs/withPagination');

router.get('/:id', async (req, res) => {
    let category = await Category.findById(req.params.id)
    res.send({ ...category.toObject(), parents: await category.getAncestors()});
});

router.get('/:id/delete', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.send({ message: "Category Deleted sucessfully" });
});

router.get('/', async (req, res) => {
    if(req.query.format == 'tree')
        res.send(await Category.getChildrenTree({ options: {lean: true} }));
    else
        res.send(await withPagination(Category)(req.query));
});

router.post('/', async (req, res) => {
    let newCategoryProperties = {
        name: req.body.name,
        isActive: req.body.isActive,
    }
    var newCategory = new Category(newCategoryProperties);
    if (req.body.parentCatId) {
        var parentCategory = await Category.findById(req.body.parentCatId);
        newCategory.parent = parentCategory;
    }
    res.send(await newCategory.save())
});

router.post('/:id', async (req, res) => {
    let exitingCategory = await Category.findById(req.params.id);
    if (!exitingCategory)
        res.status(404).send("data is not found");
    else 
        for (const key in req.body) {
            if(key == "parentCatId") continue;
            exitingCategory[key] = req.body[key];
        }

        if (req.body.parentCatId) {
            var newParentCategory = await Category.findById(req.body.parentCatId);
            let existingnParentCategory = await exitingCategory.getParent();
            if(existingnParentCategory.id != newParentCategory.id ){
                exitingCategory.parent = newParentCategory;
            }
        }

        await exitingCategory.save();
        res.send(exitingCategory)
});

sendError = err => res.status(500).send({
    message: err.message || "Something went Wrong"
});
module.exports = router;