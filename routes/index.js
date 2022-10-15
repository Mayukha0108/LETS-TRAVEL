var express = require('express');
var router = express.Router();

// Require controllers:
const hotelController=require('../controllers/hotelController');
const hotel = require('../models/hotel');
const userController=require('../controllers/userController');


/* GET home page. */
// router.get('/',function(req,res) {
//     if(req.session.page_views) {
//         req.session.page_views++;
//         res.send(`Number of page visits : ${req.session.page_views}`);
//     }
//     else {
//         req.session.page_views = 1;
//         res.send('First Visit');
//     }
// } );
router.get('/', hotelController.homePageFilters);

router.get('/all', hotelController.listAllHotels);

router.get('/all/:hotel',hotelController.hotelDetail);

router.get('/countries',hotelController.listAllCountries);

router.get('/countries/:country',hotelController.hotelsByCountry);

router.post('/results', hotelController.searchResults);

//ADMIN ROUTES:
router.get('/admin', userController.isAdmin, hotelController.adminPage);
// router.get('/admin/*', userController.isAdmin);

router.get('/admin/add', hotelController.createHotelGet);
router.post('/admin/add',
hotelController.upload,
hotelController.pushToCloudinary,
hotelController.createHotelPost);

router.get('/admin/edit-remove', hotelController.editRemoveGet);
router.post('/admin/edit-remove', hotelController.editRemovePost);

router.get('/admin/:hotelId/update', hotelController.updateHotelGet);
router.post('/admin/:hotelId/update',
hotelController.upload,
hotelController.pushToCloudinary,
hotelController.updateHotelPost);

router.get('/admin/:hotelId/delete',hotelController.deleteHotelGet);
router.post('/admin/:hotelId/delete',
hotelController.upload,
hotelController.pushToCloudinary,
hotelController.deleteHotelPost);
router.get('/admin/orders', userController.allOrders);
module.exports = router;


//USER ROUTES:
router.get('/sign-up', userController.signUpGet);
router.post('/sign-up', 
userController.signUpPost, 
userController.loginPost);

router.get('/login', userController.loginGet);
router.post('/login',userController.loginPost);
router.get('/logout',userController.logout);
router.get('/confirmation/:data', userController.bookingConfirmation);
router.get('/order-placed/:data',userController.orderPlaced);
router.get('/my-account',userController.myAccount);

module.exports=router;