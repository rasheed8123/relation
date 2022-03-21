const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json());
 const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/web15")
 }


const UserSchema = mongoose.Schema({
   firstname: {type:String, required :true},
   lastname: {type:String, required :true},
   email: {type: String,required:true,unique:true},
   password:{ type:String, required:true}

},{
   versionKey: false,
   timestamps:true,
})

const User = mongoose.model("user",UserSchema)

const PostSchema = new mongoose.Schema({
    title: {type:String, required :true},
    body: {type:String, required :true},
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "user",required:true}
    
 
 },
 {
    timestamps: true,
 })

 const Post = mongoose.model("post",PostSchema)

 const commentSchema =new mongoose.Schema({
    
    body: {type:String, required :true},
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "user",required:true},
    postid : {type: mongoose.Schema.Types.ObjectId,ref: "post",required:true}
 },
 {
    versionKey : false,   
    timestamps: true,
 })

 const comment = mongoose.model("comment",commentSchema)


app.get("/users",async(req,res)=>{
    try{
        const data =await  User.find({}).lean().exec()
        return res.status(200).send(data)
    }
    catch(err){
        return res.status(500).send("error")
    }
    

})
app.post("/users",async(req,res)=>{
   try{
       const user = await User.create(req.body)
       return res.status(201).send(user)
   }
   catch(err){
       return res.status(500).send(err.message)
   }
   

})
app.get("/users/:id",async(req,res)=>{
   try{
       const data =await  User.findById(req.params.id)
       return res.status(200).send(data)
   }
   catch(err){
       return res.status(500).send("error")
   }
   

})  
app.patch("/users/:id",async(req,res)=>{
   try{
       const data =await  User.findByIdAndUpdate(req.params.id,req.body,{new:true})
       return res.status(200).send(data)
   }
   catch(err){
       return res.status(500).send("error")
   }
   

})

app.delete("/users/:id",async(req,res)=>{
   try{
       const data =await  User.findByIdAndDelete(req.params.id)
       return res.status(200).send(data)
   }
   catch(err){
       return res.status(500).send("error")
   }
   

})
//   post CRUD opertions;
app.get("/posts",async(req,res)=>{
   try{
     const posts = await Post.find({}).lean().exec()
     return res.status(200).send(posts)
   }catch(err){
      
      console.log(err.message)
      return res.status(500)
   }
})
app.post("/posts",async (req,res)=>{
   try{
     const posts = await Post.create(req.body)
     return res.status(201).send(posts)
   }catch(err){
      console.log(err.message)
   }
})
app.get("/posts/:id",async (req,res)=>{
   try{
     const posts = await Post.findById(req.params.id,req.body)
     return res.status(201).send(posts)
   }catch(err){
      console.log(err.message)
   }
})
app.patch("/posts/:id",async (req,res)=>{
   try{
     const posts = await Post.findByIdAndUpdate(req.params.id,req.body)
     return res.status(201).send(posts)
   }catch(err){
      console.log(err.message)
   }
})
app.delete("/posts/:id",async (req,res)=>{
   try{
     const posts = await Post.findByIdAndDelete(req.params.id,req.body)
     return res.status(201).send(posts)
   }catch(err){
      console.log(err.message)
   }
})

// comments crud operations
app.get("/comments",async(req,res)=>{
   try{
      const comments = await comment.find({}).lean().exec()
      return res.status(205).send(comments)
   }catch(err){
      return res.status(500).send(err.message)

   }
})
app.post("/comments",async(req,res)=>{
   try{
      const comments = await comment.create(req.body)
      return res.status(202).send(comments)

   }catch(err){
      return res.send(err.message)
   }
})
app.get("/comments/:id",async(req,res)=>{
   try{
     const comments = await comment.findById(req.params.id,req.body)
     return res.status(500).send(comments)
   }catch(err){
      return res.status(201).send(err.message)
   }
})
app.patch("/comments/:id",async(req,res)=>{
   try{
      const comments = await comment.findByIdAndUpdate(req.params.id,req.body)
      return res.status(201).send(comments)
    }catch(err){
       return res.status(201).send(err.message)
    }
})
app.delete("/comments/:id",async(req,res)=>{
   try{
      const comments = await comment.findByIdAndDelete(req.params.id,req.body)
      return res.status(201).send(comments)
    }catch(err){
       return res.status(201).send(err.message)
    }
})

app.listen(5000, async()=>{
   try{
       await connect();
   }
   catch(err){
       console.log(err)
   }
  console.log("listening at 5000 port")
})