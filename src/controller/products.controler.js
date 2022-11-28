import { read, write } from '../utils/model.js'

let productsControler = {
    PARAMS: (req,res) => {
        let products = read("products")
        let { id } = req.params;
    
         products = products.find(product => product.product_id == id)
         res.send(products)
    },
    QUERY: (req, res) =>{
    let products = read('products')
    let {  subCategoryId, model } = req.query;
    
    let filteredUser
    for (const item of products) {

      if (subCategoryId) {
        filteredUser = products.filter(product => product.sub_category_id == subCategoryId)
      }

      if (model) {
        filteredUser = products.filter(product => product.model == model)
      }

      if (model && subCategoryId) {
        filteredUser = products.filter(product => product.model == model && product.sub_category_id == subCategoryId)
      }

    }

    res.send(filteredUser)
    },

    POST : (req, res) => {
      let products = read("products")
      let subcategories = read("subcategories")

      let { subCategoryId, productName, price, color, model} = req.body;

      let validate =  subcategories.find(subcategory => subcategory.sub_category_id == subCategoryId)

      try {
        if (!validate) {
          throw new Error("subcategory is not defined")
        }

        if (!(productName && price && color && model)) {
          throw new Error("toliq yozin")
        }

        let newProduct = {
          product_id:products.at(-1)?.product_id + 1 || 1,
          sub_category_id: subCategoryId,model,
          product_name: productName,color,model
        }

        products.push(newProduct)
        write("products", products)
        res.status(200).json({status: 200, message: "product is added", data: newProduct})
      } catch (error) {
        res.status(400).json({status: 400, message: error.message})
      }

    },
    DELETE: (req, res) => {
      let products = read("products");
      let { id } = req.params;

      let productIn = products.findIndex(product => product.product_id == id)
      if (productIn != -1) {
          let product = products.splice(productIn, 1)
          write("products", products)
          return res.status(200).json({status: 200, message: "product is deleted", data:product})
      }else{
          res.status(404).json({status: 404, message: "category not found"})
      }
    },

    PUT: (req, res) => {
      let products = read("products")
      let { id } = req.params;
      let { productName } = req.body;

      let product = products.find(product => product.product_id == id)

      if (product) {
          product.product_name = productName ||  product.product_name;
          write("products", products)
          res.status(200).json({status: 200, message: "product is updated", data: product})
      }else {
          res.status(404).json({status: 404, message: "product not found"})
      }

}}

export default productsControler