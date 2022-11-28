import express from "express";
import cors from "cors";
import categoriesControler from "./controller/categories.controler.js"
import subcategoriesControler from "./controller/subcategories.controler.js";
import productsControler from "./controller/products.controler.js";


const PORT = process.env.PORT || 5000;

const app = express()
app.use( express.json() )
app.use(cors());
app.get("/", (req, res) => {
    res.send("home page qilinmagan, we are have categories, subcategories, products pages")
})

app.route("/categories")
.get(categoriesControler.GET)
.post(categoriesControler.POST)
app.get("/categories/:id", categoriesControler.PARAMS)
app.delete("/categories/:id", categoriesControler.DELETE)
app.put("/categories/:id", categoriesControler.PUT)

app.route("/subcategories")
.get(subcategoriesControler.GET)
.post(subcategoriesControler.POST)
app.get("/subcategories/:id", subcategoriesControler.PARAMS)
app.delete("/subcategories/:id", subcategoriesControler.DELETE)
app.put("/subcategories/:id", subcategoriesControler.PUT)


app.route("/products")
.get(productsControler.QUERY)
.post(productsControler.POST)
app.get("/products/:id", productsControler.PARAMS)
app.delete("/products/:id", productsControler.DELETE)
app.put("/products/:id", productsControler.PUT)


app.listen(PORT, () => console.log("server url: http://localhost:5000"))