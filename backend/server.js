const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const Item=require("./models/Item");
dotenv.config();
const app=express(),PORT=process.env.PORT||5000;
app.use(cors());app.use(express.json());
app.get("/api/health",(req,res)=>res.json({success:true,message:"Lost & Found API is running"}));
app.post("/api/items",async(req,res)=>{
 try{
  const {type,itemName,category,description,location,date,contactName,contact}=req.body;
  if(!type||!itemName||!category||!description||!location||!date||!contactName||!contact)
   return res.status(400).json({message:"All item details are required."});
  const item=await Item.create({type,itemName,category,description,location,date,contactName,contact});
  res.status(201).json(item);
 }catch(e){res.status(500).json({message:"Failed to report item.",error:e.message});}
});
app.get("/api/items",async(req,res)=>{
 try{res.json(await Item.find().sort({createdAt:-1}));}
 catch(e){res.status(500).json({message:"Failed to load items."});}
});
app.get("/api/items/search",async(req,res)=>{
 try{
  const q=(req.query.q||"").trim();
  if(!q)return res.json(await Item.find().sort({createdAt:-1}));
  const r=new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i");
  res.json(await Item.find({$or:[{itemName:r},{category:r},{description:r},{location:r},{type:r}]}).sort({createdAt:-1}));
 }catch(e){res.status(500).json({message:"Search failed."});}
});
mongoose.connect(process.env.MONGO_URI).then(()=>{
 console.log("MongoDB connected");
 app.listen(PORT,()=>console.log(`Backend running on http://localhost:${PORT}`));
}).catch(e=>{console.error("MongoDB connection failed:",e.message);process.exit(1);});