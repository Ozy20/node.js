const addUserPage = (req,res)=>{
    res.status(200).render("addUser")
}
const modifyUserPage = (req,res)=>{
    res.status(200).render("modifyUser")
}
const deleteUser = (req,res)=>{
    res.status(200).render("deleteUser")
}
module.exports ={
    addUserPage,
    modifyUserPage,
    deleteUser
}