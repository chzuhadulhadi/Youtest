//Importing table definitions
const db = require('./definition/index');
const user = db.user;
const test = db.test;
const userTest = db.userTest;
const email = db.email;
const mailingList = db.mailingList;
const mailingListUser = db.mailingListUser;
const landingPage = db.landingPage;


//relations -------------------------------

// user- many-to-one
user.hasMany(test, { onDelete: 'CASCADE', foreignKey: 'createdById' });
test.belongsTo(user, { onDelete: 'CASCADE', foreignKey: 'createdById' });

test.hasMany(userTest, { foreignKey: 'testId' });
userTest.belongsTo(test, { foreignKey: 'testId' });
landingPage.hasOne(userTest, { foreignKey: 'landingPageId' });
userTest.belongsTo(landingPage, { foreignKey: 'landingPageId' });

//mailing list
mailingList.hasMany(mailingListUser, { foreignKey: 'mailingListId' });
mailingListUser.belongsTo(mailingList, { foreignKey: 'mailingListId' });

//mailing list with user
mailingList.belongsTo(user, { foreignKey: 'userId' });
user.hasMany(mailingList, { foreignKey: 'userId' });

mailingListUser.belongsTo(user, { foreignKey: 'userId' });
user.hasMany(mailingListUser, { foreignKey: 'userId' });

//Landing Page
// landingPage.belongsTo(test, { foreignKey: 'testId' });
// test.hasOne(landingPage, { foreignKey: 'testId' });

//userTest
userTest.belongsTo(user, { foreignKey: 'ownerId' });
user.hasOne(userTest, { foreignKey: 'ownerId' });


//relations ------------end----------------
//Exporting models
const model = {
  user,
  test,
  userTest,
  email,
  mailingList,
  mailingListUser,
  landingPage
};
module.exports = model;
