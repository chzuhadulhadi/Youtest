try {
	module.exports = {
		//admin

		adminLogin: require('./admin/login'),
		getUsers:require('./admin/getusers'),
		getUser:require('./admin/getuser'),
		getTests:require('./admin/gettests'),
		updateUsers:require('./admin/updateusers'),
		deleteUser:require('./admin/deleteusers'),
		updateTests:require('./admin/updatetests'),
		deleteTests:require('./admin/deletetests'),
		getResults:require('./admin/getresults'),
		createPackage: require('./admin/createPackage'),
		getPackage: require('./admin/getPackage'),
		updatePackage: require('./admin/updatePackage'),
		deletePackage: require('./admin/deletePackage'),
		
		
		//user
		login: require('./user/login'),
		handleIPN: require('./user/handleIPN'),
		verifyEmail: require('./user/verifyEmail'),
		forgotPass: require('./user/forgotPass'),
		signUp: require('./user/signUp'),
		resetPassword: require('./user/resetPassword'),
		checkOtp: require('./user/checkOtp'),
		sendOtp: require('./user/sendOtp'),
		handlePayment:require('./user/handlePayment'),
		userPackage:require('./user/userPackage'),
		myInfo:require('./user/myInfo'),
		




		createTest: require('./test/createTest'),
		getMyTest: require('./test/getMyTest'),
		getSingleTest: require('./test/getSingleTest'),
		duplicateTest: require('./test/duplicateTest'),
		

		startTest: require('./userTest/startTest'),
		endUserTest: require('./userTest/endUserTest'),
		initiateTestForUser: require('./userTest/initiateTestForUser'),
		getUserTestDetails: require('./userTest/getUserTestDetails'),
		saveUserTest: require('./userTest/saveUserTest'),
		transferTest: require('./userTest/transferTest'),
		copyTest: require('./userTest/copyTest'),
		getResult: require('./userTest/getResult'),
		getAllPreviousQuestions: require('./test/getAllPreviousQuestions'),

		submitLandingPageDetails: require('./userTest/submitLandingPageDetail'),
		getUserTestHistory: require('./userTest/getUserTestHistory'),
		deleteUserTestHistory: require('./userTest/deleteUserTestHistory'),
		sendUserInfo:require('./landingPage/UserInfo'),
		// attachLandingPagetoTest: require('./landingPage/attachLandingPagetoTest'),

		uploadFile: require('./test/uploadFile'),
		getMailingList: require('./mailingList/getMailingList'),
		addMailingList: require('./mailingList/addMailingList'),
		deleteMailingList: require('./mailingList/deleteMailingList'),
		updateMailingList: require('./mailingList/updateMailingList'),
		addMailingListUser: require('./mailingListUser/addMailingListUser'),
		getMailingListUser: require('./mailingListUser/getMailingListUser'),
		updateMailingListUser: require('./mailingListUser/updateMailingListUser'),
		deleteMailingListUser: require('./mailingListUser/deleteMailingListUser'),

		getLandingPage: require('./landingPage/getLandingPage'),
		getSingleLandingPage: require('./landingPage/getSingleLandingPage'),
		addLandingPage: require('./landingPage/addLandingPage'),
		updateLandingPage: require('./landingPage/updateLandingPage'),
		deleteLandingPage: require('./landingPage/deleteLandingPage'),
		getAttachedTest: require('./landingPage/getAttachedTest'),

	};
} catch (e) {
	console.log(e.stack);
}
