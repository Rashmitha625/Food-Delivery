import userModel from '../models/userModel.js'

const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;

        if (!userId || !itemId) {
            return res.json({ success: false, message: "User ID and Item ID are required" });
        }

        const userData = await userModel.findById(req.body.userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartDate = userData.cartDate || {};

        if (!cartDate[itemId]) {
            cartDate[itemId] = 1;
        } else {
            cartDate[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartDate });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


const removeFromCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartDate = await userData.cartDate;
        if (cartDate[req.body.itemId]>0) {
            cartDate[req.body.itemId] -= 1; 
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartDate})
        res.json({success:true,message:"Removed from cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const getCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartDate = await userData.cartDate;
        res.json({success:true,cartDate})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {addToCart,removeFromCart,getCart}