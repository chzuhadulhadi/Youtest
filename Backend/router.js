const router = require('express').Router();
const { verifyPermissions, verifyJwt } = require("./common/authentication");
const getusers = require('./controllers/admin/getusers');
//user
const {
    login,
    adminLogin,
    signUp,
    resetPassword,
    checkOtp,
    sendOtp,
    createTest,
    getSingleTest,
    getUsers,
    getUser,
    updateUsers,
    deleteUser,
    getTests,
    updateTests,
    deleteTests,
    getResults,
    sendUserInfo,
    handleIPN,
    sendContactInfo,

    getMyTest,
    startTest,
    verifyEmail,
    forgotPass,
    transferTest,
    copyTest,
    getAllPreviousQuestions,
    createPackage,
    getPackage,
    updatePackage,
    deletePackage,
    userPackage,
    myInfo,

    initiateTestForUser,
    getUserTestDetails,
    saveUserTest,
    duplicateTest,
    endUserTest,
    getSingleLandingPage,
    // attachLandingPagetoTest,

    getResult,
    uploadFile,
    getMailingList,
    addMailingList,
    deleteMailingList,
    updateMailingList,
    addMailingListUser,
    getMailingListUser,
    updateMailingListUser,
    deleteMailingListUser,

    getLandingPage,
    addLandingPage,
    updateLandingPage,
    deleteLandingPage,
    submitLandingPageDetails,
    getAttachedTest,
    getUserTestHistory,
    deleteUserTestHistory,
    handlePayment,

} = require('./controllers/index');

//admin
router.post('/api/admin/login', adminLogin);
router.post('/api/admin/getUsers', verifyJwt,getUsers);
router.post('/api/admin/getUser',verifyJwt,getUser);
router.post('/api/admin/getTests', verifyJwt,getTests);
router.post('/api/admin/updateUser', verifyJwt, updateUsers);
router.post('/api/admin/deleteUser', verifyJwt, deleteUser);
router.post('/api/admin/updateTest', verifyJwt, updateTests);
router.post('/api/admin/deleteTest', verifyJwt, deleteTests);
router.post('/api/admin/getResults', verifyJwt, getResults);
router.post('/api/admin/createPackage', verifyJwt, createPackage);
router.post('/api/admin/getPackage', getPackage);
router.post('/api/admin/updatePackage', verifyJwt, updatePackage);
router.post('/api/admin/deletePackage', verifyJwt, deletePackage);
router.post('/api/ipn-handler',handleIPN);
router.post('/api/payment-handler',verifyJwt,handlePayment);
router.post('/api/user/getPackage',verifyJwt,userPackage);
//user
router.post('/api/user/login', login);
router.post('/api/user/signUp', signUp);
router.post('/api/user/verifyemail', verifyEmail);
router.post('/api/user/forgotpassword', forgotPass);
router.post('/api/user/resetpassword', resetPassword);
router.post('/api/user/myprofile', verifyJwt, myInfo);
router.post('/api/user/send-email', sendContactInfo);
// router.post('/api/user/checkOtp', checkOtp);
// router.post('/api/user/sendOtp', sendOtp);

//Test
router.post('/api/test/createTest', verifyJwt, createTest);
router.post('/api/test/duplicateTest', verifyJwt, duplicateTest);
router.post('/api/test/deleteTest', verifyJwt, deleteTests);
router.post('/api/test/getSingleTest', verifyJwt, getSingleTest);
router.post('/api/test/getMyTest', verifyJwt, getMyTest);
router.post('/api/test/uploadFile', uploadFile);
router.post('/api/test/transferTest', verifyJwt, transferTest);
router.post('/api/test/copyTest', verifyJwt, copyTest);
router.post('/api/test/getAllPreviousQuestions', verifyJwt, getAllPreviousQuestions);

//userTest
router.post('/api/userTest/submitLandingPageDetails', submitLandingPageDetails);
router.post('/api/userTest/startTest', startTest);
router.post('/api/userTest/endUserTest', endUserTest);
// router.post('/api/userTest/attachLandingPagetoTest', attachLandingPagetoTest);

router.post('/api/userTest/initiateTestForUser', verifyJwt, initiateTestForUser);
router.post('/api/userTest/getUserTestDetails', getUserTestDetails);
router.post('/api/userTest/saveuserTest', saveUserTest);
router.post('/api/userTest/getResult', getResult);
router.post('/api/userTest/getUserTestHistory', verifyJwt, getUserTestHistory);
router.post('/api/userTest/deleteUserTestHistory', verifyJwt, deleteUserTestHistory);

//Mailing List
router.post('/api/mailingList/getMailingList', verifyJwt, getMailingList);
router.post('/api/mailingList/addMailingList', verifyJwt, addMailingList);
router.post('/api/mailingList/deleteMailingList', verifyJwt, deleteMailingList);
router.post('/api/mailingList/updateMailingList', verifyJwt, updateMailingList);

//Mailing List User
router.post('/api/mailingListUser/addMailingListUser', verifyJwt, addMailingListUser);
router.post('/api/mailingListUser/getMailingListUser', verifyJwt, getMailingListUser);
router.post('/api/mailingListUser/deleteMailingListUser', verifyJwt, deleteMailingListUser);
router.post('/api/mailingListUser/updateMailingListUser', verifyJwt, updateMailingListUser);

//Landing Pages
router.post('/api/landingPage/getLandingPage', verifyJwt, getLandingPage);
router.post('/api/landingPage/getSingleLandingPage', verifyJwt, getSingleLandingPage);
router.post('/api/landingPage/addLandingPage', verifyJwt, addLandingPage);
router.post('/api/landingPage/updateLandingPage', verifyJwt, updateLandingPage);
router.post('/api/landingPage/deleteLandingPage', verifyJwt, deleteLandingPage);
router.post('/api/landingPage/getAttachedTest', verifyJwt, getAttachedTest);
router.post('/api/landingPage/UserInfo',verifyJwt,sendUserInfo);

// router.post('/api/landingPage/getAttachedTest', verifyJwt, g);


module.exports = router;
