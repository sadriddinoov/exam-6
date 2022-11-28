import e from 'express';
import { read, write } from '../utils/model.js'

let categoriesControler = {
    GET: (req, res) => {
        let categories = read("categories")
        let subcategories = read("subCategories");


        categories.map(category => {
            category.subcategories = subcategories.filter(subcategory => subcategory.category_id == category.category_id)
            category.subcategories.map(item => delete item.category_id)
        })
        res.send(categories)
    },

    PARAMS:  (req, res) => {
        let categories = read("categories")
        let subcategories = read("subCategories");
        let { id } = req.params;
    
        let category = categories.find(category => category.category_id == id)
    
        categories.map(category => {
            category.subcategories = subcategories.filter(subcategory => subcategory.category_id == category.category_id)
            
            category.subcategories.map(item => delete item.category_id)
        })
    
        res.send(category)
    },

    POST: (req, res) => {
        let categories = read("categories")
        let { categoryName } = req.body;
        try {
            if (!(categoryName && categoryName.length >= 3)) {
                throw new Error("invalid username")
            }
            let newCategory = {
                category_id: categories.at(-1)?.category_id + 1 || 1, categoryName
            }
            categories.push(newCategory)
            write("categories", categories)
            res.status(200).json({status: 200, message: "category is added", data: newCategory})
        } catch (error) {
            res.status(400).json({status: 400, message: error.message})
        }
    },

    DELETE: (req, res) => {
        let { id } = req.params;
        let categories = read("categories");
        let categoryIn = categories.findIndex(category => category.category_id == id)
        if (categoryIn != -1) {
            let category = categories.splice(categoryIn, 1)
            write("categories", categories)
            return res.status(200).json({status: 200, message: "category is deleted", data:category})
        }else{
            res.status(404).json({status: 404, message: "category not found"})
        }
    },

    PUT : (req, res) => {
        let categories = read("categories")
        let { id } = req.params;
        let { categoryName } = req.body

        let category = categories.find(category => category.category_id == id)

        if (category) {
            category.category_name = categoryName ||  category.category_name;
            write("categories", categories)
            res.status(200).json({status: 200, message: "category is updated", data: category})
        }else {
            res.status(404).json({status: 404, message: "category not found"})
        }
    }

   
}

export default categoriesControler