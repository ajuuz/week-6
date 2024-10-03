const express=require('express');
const router=express.Router();

const adminController = require('../controller/adminController');
const { route } = require('./userRoute');

router.get('',adminController.basePage)
router.get('/signup',adminController.signupPage)
router.post('/signup',adminController.signupSubmit)
router.get('/login',adminController.loginPage)
router.post('/login',adminController.loginSubmit)
router.get('/home',adminController.homePage)
router.post('/logout',adminController.logout)
router.get('/edit-user/:id',adminController.editUser)
router.patch('/update-user/:id',adminController.updateUser);
router.delete('/delete-user/:id',adminController.deleteUser)
router.get('/add-user',adminController.addUser)
router.post('/add-user',adminController.addNewUser)
router.get('/add-pendingTopics/:id',adminController.pendingTopics);
router.post('/add-pendingTopics/:id',adminController.addPendingTopics);
module.exports = router;