const express=require('express');
const router=express.Router();
const userController = require('../controller/userController'); 



router.get('',userController.basePage);
// router For Signup
router.route('/signup')
.get(userController.signupPage)
.post(userController.signupSubmit)
// router For login
router.route('/login')
.get(userController.loginPage)
.post(userController.loginSubmit)
// router For home
router.get('/home',userController.homePage)
// router For logout
router.post('/logout',userController.logout)


module.exports = router;