import mongoose, { Schema } from "mongoose";
// import dompurify from "dompurify";
import slugify from "slugify";
import createDomPurify from "dompurify"
import { JSDOM } from "jsdom"
import { marked } from "marked";
const dompurify = createDomPurify(new JSDOM().window)
const BlogSchema = new Schema({
    title:{
        type:String,
        required:true,
        index: true,
       
    },
    description: {
        type: String,
        required: true,
  
      },
      markdown: {
        type: String,
        required: true,
      },
      createdAt:{
        type:Date,
        default:Date.now
      },
      slug:{
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML:{
        type: String,
        required: true
    }


    },
      {
        timestamps: true,
      }
);
BlogSchema.pre('validate', function(next){
  if(this.title){
      this.slug = slugify(this.title,{lower:true, strict: true})
  }
  if(this.markdown){
      this.sanitizedHTML= dompurify.sanitize(marked(this.markdown))
  }

  next()


})
export const Blog = mongoose.model("Blog", BlogSchema);
