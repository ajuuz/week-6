const {User}= require('../models/schema')


const basePage = (req,res)=>{
    if(req.session.user)
    {
        res.redirect('/user/home');
    }
    else
    {
        res.render('user/basePage')
    }
}


const signupPage=(req,res)=>{
    if(req.session.user)
    {
        res.redirect('/user/home')
    }
    else
    {
        res.render('user/signup',{err:""})
    }
}


// signUpSubmit

const signupSubmit= async (req,res)=>{
    const FIRSTNAME=req.body.firstname;
    const LASTNAME=req.body.lastname;
    const USERNAME=req.body.username;
    const PASSWORD=req.body.password;
    const EMAIL = req.body.email;
    // console.log(USERNAME)
    // res.send("registered")
    try{
        const newUser = new User({
            firstname:FIRSTNAME,
            lastname:LASTNAME,
            username:USERNAME,
            password:PASSWORD,
            email:EMAIL
        })
        await newUser.save()
       console.log("data saved")
       res.redirect('/user/login')
    }
    catch (err){
        if(err.code===11000){
            res.render("user/signup",{err:"Email or username already exists"});
        }
        else
        {
            console.error("error: ",err);
            res.render("user/signup",{err:"an error occured . please try again"})
        }
    }
}

const loginPage = (req,res)=>{
    if(req.session.user)
    {
        res.redirect("/user/home");
    }
    else
    {
        res.render('user/login',{err:""})
    }
}

const loginSubmit =async (req,res)=>{
    const USERNAME = req.body.username;
    const PASSWORD = req.body.password;
    const userExists= await User.findOne({username:USERNAME,password:PASSWORD});
    if(userExists)
    {
        req.session.user=true;
        req.session.username=USERNAME;
        res.redirect('/user/home');
    }
    else
    {
        res.render("user/login",{err:`invalid credential`})
    }
}

const homePage =async (req,res)=>{
    if(req.session.user)
    {
        const user = await User.findOne({username:req.session.username});
        pendingTopicsofCurrentUser=user?.pendingTopics || [];
        res.render("user/home",{msg:`welcome ${req.session.username}`,pendingTopicsofCurrentUser})
    }
    else{
        res.redirect('/user/login')
    }
}

const logout = (req,res)=>{
    delete req.session.user;
    delete req.session.username;
    res.redirect('/user/login');
}

module.exports = {
    signupPage,signupSubmit,loginPage,loginSubmit,homePage,logout,basePage
}