import { read, write } from '../utils/model.js'

let subcategoriesControler = {
    GET: (req, res) => {
        let subcategories = read("subCategories");
        let products = read("products")


        subcategories.map(subcategory => {
            subcategory.products = products.filter(product => product.sub_category_id == subcategory.sub_category_id)

            for (const item of subcategories) {
              delete item.category_id
            }
            subcategory.products.map(item => delete item.sub_category_id)
        })
        res.send(subcategories)
    },
    PARAMS: (req, res) => {
        let subcategories = read("subCategories");
        let products = read("products")
        let { id } = req.params;
    
        let subcategory = subcategories.find(subcategory => subcategory.sub_category_id == id)
    
        subcategories.map(subcategory => {
            subcategory.products = products.filter(product => product.sub_category_id == subcategory.sub_category_id)
            subcategory.products.map(item => delete item.sub_category_id)
        })
    
        res.send(subcategory)
    },
    POST: (req, res) => {
        let categories = read("categories")
        let subcategories = read("subcategories")
        let { categoryId, subCategoryName } = req.body

        let vallidate =  categories.find(category => category.category_id == categoryId)

        try {
            if (!(vallidate)) {
                throw new Error("category is not defined")
            }
    
            if (!(subCategoryName && subCategoryName.length >= 3)) {
              throw new Error("invalid subcategory name")  
            }

            let newSubCategory = {
                sub_category_id : subcategories.at(-1)?.sub_category_id + 1 || 1, category_id: categoryId, sub_category_name: subCategoryName
            }

            subcategories.push(newSubCategory)
            write("subcategories", subcategories)
            res.status(200).json({status: 200, message: "subcategory is added", data: newSubCategory})
        } catch (error) {
            res.status(400).json({status: 400, message: error.message})
        }
    },

    DELETE: (req, res) => {
        let subcategories = read("subcategories")
        let { id } = req.params
        let subcategoryIn = subcategories.findIndex(subcategory => subcategory.sub_category_id == id)
        if (subcategoryIn != -1) {
            let subcategory = subcategories.splice(subcategoryIn, 1)
            write("subcategories", subcategories)
            return res.status(200).json({status: 200, message: "subcategory is deleted", data:subcategory})
        }else{
            res.status(404).json({status: 404, message: "subcategory not found"})
        }
    },
    PUT: (req, res) => {
        let subcategories = read("subcategories")
        let { id } = req.params;
        let { subcategoryName } = req.body;

        let subcategory = subcategories.find(subcategory => subcategory.sub_category_id == id)

        if (subcategory) {
            subcategory.sub_category_name = subcategoryName ||  subcategory.sub_category_name;
            write("subcategories", subcategories)
            res.status(200).json({status: 200, message: "subcategory is updated", data: subcategory})
        }else {
            res.status(404).json({status: 404, message: "subcategory not found"})
        }
    }
}

export default subcategoriesControler