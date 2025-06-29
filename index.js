const express= require("express");
const app=new express();
const port = process.env.PORT || 3000;
const path= require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
const {v4:uuidv4}=require('uuid');
const mo=require("method-override");

app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(mo("_method"));
app.use(express.json());
 let allposts=[
    {user:"Virat Kohli",
        post:"Just Finished Practice",
        id:uuidv4()
},
{user:"Anupam Roy",
        post:"What a Weather!!",
        id:uuidv4()
},
{user:"Rahul",
        post:"Just Made this site",
        id:uuidv4()
},
{user:"Anonymus",
        post:"Hello All",
        id:uuidv4()
},
]
app.get("/",(req,res)=>{
    res.render("index.ejs",{allposts});
})
app.get("/newpost",(req,res)=>{
    res.render("create.ejs");
})
app.post("/",(req,res)=>{
    let {user,post}=req.body;
    let id=uuidv4();
    allposts.push({user,post,id});
    res.redirect("/");
})
app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
    let delpost=allposts.find((p)=>p.id===id);
    allposts=allposts.filter(p=>p!=delpost);
    res.redirect("/");
})
app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    let editpost=allposts.find((p)=>p.id===id);
    res.render("edit.ejs",{editpost});
})

app.patch("/:id",(req,res)=>{
    let newpost=req.body;
    let {id}=req.params;
    let target=allposts.find((p)=>p.id===id);
    target.post=newpost.post;
    res.redirect("/");
})



app.listen(port,()=>{
    console.log("Listenning to Port 3000")
})






