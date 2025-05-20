
const getProducts = async(req,res)=>{
    res.status(200).json({id:req.user.id,username:req.user.username})
}





module.exports = {getProducts}