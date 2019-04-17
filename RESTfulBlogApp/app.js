var  bodyParser  =  require("body-parser"),
     methodOverride= require("method-override"),
     mongoose    =  require("mongoose"),
     express     =  require("express"),
     app         =  express();
  
//   :27017,{useNewUrlParser:true}
  mongoose.connect("mongodb://localhost/restful_blog_app:27017",{useNewUrlParser:true});
  app.set("view engine","ejs");
  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride("_method"));
  //   title
//   image
//   body
//   created

var blogSchema =new mongoose.Schema({
    title : String,
    image : String,
    body  : String,
    created:  {type:Date, default: Date.now}
});
var Blog =mongoose.model("Blog",blogSchema);
 
// Blog.create({
//     title:"Test Blog",
//     image:"http://img.fliptab.io/mountain/1920x1200/2699491.jpg",
//     body:"HELLO THIS IS A BLOG POST"    
// })
//RESTFUL ROUTES
app.get("/",function(req,res){
    res.redirect("blogs");
})

//INDEX ROUTE
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log("ERROR!");
        }else{
            res.render("index",{blogs:blogs});
        }
    })
})

// NEW route
app.get("/blogs/new",function(req, res) {
    res.render("new");
})

//POST route
app.post("/blogs",function(req,res){
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            res.render("new");
        }else{
            //then ,redirect to the index
            res.redirect("/blogs");
        }
    })
})

//SHOW route
app.get("/blogs/:id",function(req, res) {
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            // res.send("this is show route");
            res.render("show",{blog:foundBlog});
        }
    })
    // res.send("this is show route");
    
})

//EDIT route
app.get("/blogs/:id/edit",function(req, res) {
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit",{blog:foundBlog});
        }
    })
})

//UPDATE Route
app.put("/blogs/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
})

//DELETE ROUTE  
app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndDelete(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs")
        }
    })
    // res.send("THis is delete route");
})
app.listen(process.env.PORT|| 1337,process.env.IP|| '127.0.0.1',function(){
    console.log("SERVER IS RUNNING");
})
// listen(process.env.PORT,process.env.IP,function() 
// listen(process.env.PORT || 1337, process.env.IP || '127.0.0.1')