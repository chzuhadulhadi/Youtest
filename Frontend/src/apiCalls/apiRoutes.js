export const environment = "C://Users/user/Downloads/";

// export const local = "http://18.140.56.176:4000/"
// export const serverUrl = "http://18.140.56.176:4000/"

export const frontEndPath = "http://18.140.56.176/"

export const local = "http://localhost:4000/"
export const serverUrl = "http://localhost:4000/"

export const signup = local + 'api/user/signUp'
export const login = local + 'api/user/login'
export const userTestDetails = local + 'api/userTest/getUserTestDetails'
export const startUserTest = local + 'api/userTest/startTest'
export const saveUserTest = local + 'api/userTest/saveUserTest'
export const endUserTest = local + 'api/userTest/endUserTest'
export const getResult = local + 'api/userTest/getResult'
export const updateLandingPageInResult = local + 'api/userTest/submitLandingPageDetails'

// test apis
export const getMyTest = local + 'api/test/getMyTest'
export const createMyTest = local + 'api/test/createTest'

//file upload

export const logoUploader = local + "api/test/uploadFIle"

//mailing list 

export const getMailingList = local + 'api/mailingList/getMailingList'
export const addMailingList = local + 'api/mailingList/addMailingList'
export const addMailingListUser = local + 'api/mailingListUser/addMailingListUser'
export const updateMailingList = local + 'api/mailingList/updateMailingList'
export const deleteMailingList = local + 'api/mailingList/deleteMailingList'
export const getMailingListUser = local + 'api/mailingListUser/getMailingListUser'
export const deleteUserInMailingListApi = local + "api/mailingListUser/deleteMailingListUser"
export const editUserOfMailingList = local +'api/mailingListUser/updateMailingListUser'

//landing pages
export const addLandingPage = local + 'api/landingPage/addLandingPage'
export const getLandingPage = local + 'api/landingPage/getLandingPage'
export const deleteLandingPage = local + 'api/landingPage/deleteLandingPage'
export const updateLandingPage = local + 'api/landingPage/updateLandingPage'
export const linkTest = local +'api/userTest/attachLandingPagetoTest'
export const viewAttachedTests = local + 'api/landingPage/getAttachedTest'
export const pathToViewTest = frontEndPath + 'filltest'
//send mailign list

export const sendMailingList = local + "api/userTest/initiateTestForUser"

//send test history

export const getQuestionaireHistoryList = local + "api/userTest/getUserTestHistory"