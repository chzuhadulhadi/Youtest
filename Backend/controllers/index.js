try {
	module.exports = {
		//admin

		adminLogin: require('./admin/login'),
		getUsers:require('./admin/getusers'),
		updateUsers:require('./admin/updateusers'),
		deleteUser:require('./admin/deleteusers'),
		//user
		login: require('./user/login'),
		verifyEmail: require('./user/verifyEmail'),
		signUp: require('./user/signUp'),
		resetPassword: require('./user/resetPassword'),
		checkOtp: require('./user/checkOtp'),
		sendOtp: require('./user/sendOtp'),
		createTest: require('./test/createTest'),
		getMyTest: require('./test/getMyTest'),
		getSingleTest: require('./test/getSingleTest'),
		

		startTest: require('./userTest/startTest'),
		endUserTest: require('./userTest/endUserTest'),
		initiateTestForUser: require('./userTest/initiateTestForUser'),
		getUserTestDetails: require('./userTest/getUserTestDetails'),
		saveUserTest: require('./userTest/saveUserTest'),
		getResult: require('./userTest/getResult'),

		submitLandingPageDetails: require('./userTest/submitLandingPageDetail'),
		getUserTestHistory: require('./userTest/getUserTestHistory'),
		deleteUserTestHistory: require('./userTest/deleteUserTestHistory'),
		attachLandingPagetoTest: require('./userTest/attachLandingPagetoTest'),

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
		addLandingPage: require('./landingPage/addLandingPage'),
		updateLandingPage: require('./landingPage/updateLandingPage'),
		deleteLandingPage: require('./landingPage/deleteLandingPage'),
		getAttachedTest: require('./landingPage/getAttachedTest'),

	};
} catch (e) {
	console.log(e.stack);
}
