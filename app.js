
const express=require('express');
const session=require('express-session');
const app=express()
const userRouter=require('./routes/userRoute');
const adminRouter=require('./routes/adminRoute');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');


// to use other methods like patch , put , delete
app.use(methodOverride('_method'));

// configuring port
const PORT= process.env.PORT || 3003;
app.listen(PORT,()=>console.log(`server running on ${PORT}`))


app.use(express.static("public"));

// specifying view engine
app.set('view engine','ejs');

// Use express-ejs-layouts middleware
app.use(expressLayouts);

// to get value from form
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// creating session
app.use(session({
    secret:'secret-key',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))

// clear cache
app.use((req,res,next)=>{
    res.set('Cache-Control','no-store');
    next();
})

app.use('/user',userRouter);

app.use('/admin',adminRouter)

app.get('/',(req,res)=>{
        res.render('firstPage')
})

app.get('*',(req,res)=>{
    res.render('error')
})