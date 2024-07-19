import mongoose from "mongoose";

export const connectDB = async () =>{
     await mongoose.connect('mongodb+srv://rashmitha8888:rashmitha24@cluster0.ec1kmh0.mongodb.net/food').then(()=>console.log("DB Connected"));
}