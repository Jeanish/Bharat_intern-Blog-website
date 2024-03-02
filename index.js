import express from "express"
const app = express()
import connectDB from "./db/index.js"
import router from "./routes/article.router.js"
import { Blog } from "./models/blog.models.js"
import methodOverride from "method-override"
import dotenv from "dotenv"

dotenv.config({
    path:'./.env'
})

app.set('view engine', 'ejs')

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true,limit:"16kb"}))
app.use(methodOverride('_method'))


app.get('/', async(req, res) => {
    const articles =await Blog.find().sort({ createdAt:'desc'})
    res.render('./articles/index', { articles: articles })
})

app.use('/articles',router)

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running on localhost:${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("mongodb connection error",error);
})