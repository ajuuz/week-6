const Admin = require('../models/schema').Admin
const {User}= require('../models/schema')


const basePage = (req,res)=>{
    if(req.session.admin)
    {
        res.redirect('/admin/home')
    }
    else
    {
        res.render('admin/base')
    }
}


const signupPage = (req,res)=>{
    if(req.session.admin)
    {
        res.redirect("/admin/home")
    }
    else
    {
        res.render('admin/signup',{err:""})
    }
}

const signupSubmit =async (req,res)=>{
    const ADMINNAME = req.body.adminname;
    const PASSWORD = req.body.password;
    console.log(ADMINNAME,PASSWORD);
    try{
        const newAdmin = new Admin({
            adminname:ADMINNAME,
            password:PASSWORD
        })
        await newAdmin.save()
        console.log("admin data saved");
        res.redirect("/admin/login");
    }
    catch (err){
        if(err.code === 11000)
        {
            res.render("admin/signup",{err:`${ADMINNAME} is already taken`})
        }
        else
        {
            res.render("admin/signup",{err:"error, please try again"})
        }
    }
}

const loginPage = (req,res)=>{
    if(req.session.admin)
    {
        res.redirect('/admin/home')
    }
    else
    {
        res.render("admin/login",{err:""})
    }
}

const loginSubmit = async (req,res)=>{
    const ADMINNAME = req.body.adminname
    const PASSWORD = req.body.password
    const adminExists = await Admin.findOne({adminname:ADMINNAME,password:PASSWORD});
    console.log(ADMINNAME,PASSWORD);
    if(adminExists)
    {
        req.session.admin = true;
        req.session.adminname=ADMINNAME;
        res.redirect('/admin/home')
    }
    else
    {
        res.render('admin/login',{err:"enter valid credentials"});
    }
}


const homePage =async (req,res)=>{
    const searchValue = req.query.searchValue;
    let flag=req.query.flag || '';
    
    if(req.session.admin)
    {
        let everyUsers;

        if(!searchValue && flag!=1)
        {   
            everyUsers= await User.find({})
            res.render('admin/home', { msg: `Welcome ${req.session.adminname}`, everyUsers });
        }
       
        else
        {
        everyUsers= await User.find({firstname:{$regex:new RegExp(searchValue,'i')}})
        res.render('admin/userTable', { everyUsers }, (err, html) => {
            
            if (err) throw err;
            res.send(html);
        });
       }
    }
    else
    {
        res.redirect('/admin/login')
    }
}



const logout = (req,res)=>{
    delete req.session.admin;
    delete req.session.adminname;
    res.redirect('/admin/login')
}

const editUser =async (req,res)=>{
    const userId = req.params.id;
    const user= await User.findOne({_id:userId})
   res.render('admin/edituser',{user})
}


const updateUser =async (req,res)=>{
    const { id } = req.params;
    const { username, email } = req.body;
    console.log(username,email)
    try {
        // Find and update user with new data
        const updatedUser = await User.updateOne({_id:id}, {$set:{username: username,email: email}}, { new: true });
        console.log(updatedUser);
        res.redirect('/admin/home'); // Redirect to the user list or another page
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Server error');
    }
}


const deleteUser =async (req,res)=>{
    const userId= req.params.id;
    console.log(userId);
    try{
        const deletedUser=await User.deleteOne({_id:userId})
        console.log(deletedUser);
        res.redirect('/admin/home');
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Server error');
    }
}

const addUser = (req,res)=>{
    if(req.session.admin)
    {
        res.render('admin/addUser')
    }
    else
    {
        res.redirect('/admin/login');
    }
}


const addNewUser =async (req,res)=>{
    
    const addedUser = req.body;

    try{
        const newuser = new User(addedUser);
        await newuser.save()
        console.log("new user added");
        res.redirect('/admin/home');
    }
    catch{
        console.error("error saving user")
    }
    
}

const pendingTopics = (req,res)=>{
    const userId=req.params.id;
    if(req.session.admin)
    {
        res.render('admin/pendingTopics',{userId})
    }
    else
    {
        res.redirect('/admin/login')
    }
}

const addPendingTopics = async (req,res)=>{
    const userId = req.params.id;
    const topic = req.body.topic;
    try{
        const updatedUser = await User.updateOne({_id:userId},{$push:{pendingTopics:topic}})
        // console.log(updatedUser);
        res.redirect(`/admin/add-pendingTopics/${userId}`)
    }
    catch{
        console.error("error");
    }
}

module.exports = {
    signupPage,signupSubmit
    ,loginPage,loginSubmit,
    homePage,basePage,
    logout,editUser,
    updateUser,
    deleteUser,addUser,
    addNewUser,pendingTopics,
    addPendingTopics
}