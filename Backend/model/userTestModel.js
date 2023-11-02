const testService = require('../service/testService');
const userTestService = require('../service/userTestService');
const mailService = require('../service/mailService');
const userService = require('../service/userService');
const landingPageService = require('../service/landingPageService');


const { Op } = require('sequelize');
const config = require('../config.json');
const Sequelize = require('../common/databaseConnection');

const model = require('../model');
const mailingListUserService = require('../service/mailingListUserService');

module.exports = {
	transferTest: async function (obj) {
		console.log(obj);
		const user=await userService.getuserByAny(obj.email);
		if(!user){
			throw new Error('User is not valid');
		}
		console.log(user.id);
		//update multiple tests where tests Id is in obj.ids
		// var t = await Sequelize.transaction();

		const updated = await testService.updateTest(user.id, obj.ids);
		console.log(updated);
		return updated;
	},
	startTest: async function (obj) {
		const start = userTestService.updateUserTest(
			{ testStart: new Date() },
			{ where: { id: obj.id, testStart: null } }
		);
		if (!start) throw new Error('Test is not valid');
		else {
			return start;
		}
	},
	submitLandingPageDetail: async function (obj) {
		const start = userTestService.updateUserTest(
			{ landingPageData: obj },
			{ where: { id: obj.id, testStart: null } }
		);
		if (!start) throw new Error('Test is not valid');
		else {
			return start;
		}
	},
	attachLandingPagetoTest: async function (obj) {
		const start = userTestService.updateUserTest(
			{ landingPageId: obj.landingPageId },
			{ where: { id: { [Op.in]: obj.id } } }
		);
		if (!start) throw new Error('Test is not valid');
		else {
			return start;
		}
	},
	endUserTest: async function (obj) {
		const start = userTestService.updateUserTest(
			{ testEnd: new Date() },
			{ where: { id: obj.id } }
		);
		let res = await this.getResult(obj);
		let usermail = await userService.getUsers({ where: { id: res.ownerId } });
		console.log('usermail', usermail[0].email);
		console.log('res', res);
		if(res.sendAll)
		{
			var emailObj = {
				to: res.userEmail,
				body: {
					firstName: '',
					surName: '',
					email: res.userEmail,
					phoneNo: '',
					...res,
				},
				type: 'testResult',
			};
		mailService.create(emailObj);

		}
		var owneremailObj = {
			to: usermail[0].email,
			body: {
				firstName: '',
				surName: '',
				email: res.userEmail,
				phoneNo: '',
				...res,
			},
			type: 'testResult',
		};
		mailService.create(owneremailObj);
		if (!start) throw new Error('Test is not valid');
		else {
			return start;
		}
	},
	initiateTestForUser: async function (obj) {
		var t = await Sequelize.transaction();

		try {
			var allTest = await testService.getAllTest({
				where: { id: { [Op.in]: obj.id } },
			});

			var user = await userService.getUsers({ where: { id: obj.userId } });

			user = user[0];
			const userTestArray = [];
			var emailObjs = [];

			for (let testDetails of allTest) {
				var mailingList = await mailingListUserService.getMailingListUser(
					0,
					100000000,
					{
						attributes: ['email', 'name'],
						where: {
							mailingListId: { [Op.in]: obj.mailingList },
						},
					}
				);
				for (let single of mailingList) {
					obj.emails.push(single.toJSON());
				}

				for (let single of obj.emails) {
					await Object.keys(testDetails.testObj).map(async function (
						categories
					) {
						console.log("Categories", categories)
						var catLength = 0;
						await Object.values(testDetails.categoryStore).map(async function (
							singleCatStore
						) {
							if (singleCatStore.categoryName == categories) {
								catLength = singleCatStore.noOfQuestion;
							}
						});

						if (testDetails.randomOrder == 1) {
							const shuffled = await userTestService.shuffle(
								Object.keys(testDetails.testObj[categories])
							);
							var shuffledAfterLength = shuffled.slice(0, catLength);
							var temp = {};
							for (let singleShuf of shuffledAfterLength) {
								temp[singleShuf] = testDetails.testObj[categories][singleShuf];
							}
							testDetails.testObj[categories] = temp;
						} else {
							//If it is not random

							testDetails.testObj[categories] = Object.fromEntries(
								Object.entries(testDetails.testObj[categories]).slice(
									0,
									catLength
								)
							);
						}
					});
					//IF LNDINGPAGEiD THEN ADD IT TO LANDINGPAGEDATA
					let landingPage=obj.LandingPageData;
					if (obj.LandingPageId) {
						var landingPageData = await landingPageService.getSingleLandingPage(
							{ id: obj.LandingPageId }
						);
						landingPage = { ...landingPageData, ...landingPage };
					}

					userTestArray.push({
						userEmail: single.email,
						name: testDetails.name,
						sendAll:testDetails.sendAll,
						landingPageData: landingPage,
						orientation: testDetails.orientation,
						beforeTestText: testDetails.beforeTestText,
						afterTestText: testDetails.afterTestText,
						scoringType: testDetails.scoringType,
						randomOrder: testDetails.randomOrder,
						testObj: { ...testDetails.testObj },
						testId: obj.id,
						layout: testDetails.layout,
						resultStructure: testDetails.resultStructure,
						automaticText: testDetails.automaticText,
						timeLimit: testDetails.timeLimit,
						categoryStore: testDetails.categoryStore,
						additionalDetails: { name: single.name, note: obj.note },
						ownerId: obj.userId,
					});
				}
			}
			// console.log(userTestArray);
			var bulkTests = await userTestService.initiateBulkTest(userTestArray, t);
			const testUrls = [];
			for (let test of bulkTests) {
				testUrls.push({
					testUrl: config.userTestUrl + test.id,
					name: test.testObj.name,
				});
				emailObjs.push({
					type: 'initiatedTest',
					to: test.userEmail,
					from: user.email,
					body: {
						testUrl: config.userTestUrl + test.id,
						name: test.testObj.name,
					},
				});
			}

			await mailService.createBulk(emailObjs, t);

			t.commit();
			return testUrls;
		} catch (e) {
			if (t) {
				await t.rollback();
			}
			throw new Error(e);
		}
	},
	getUserTestDetails: async function (obj) {
		// try {
		var testDetails = await userTestService.getUserTest(0, 1, {
			where: { id: obj.id },
			include: {
				model: model.landingPage,
			},
		});
		if (!testDetails.length) {
			throw new Error('Test is not avaialble anymore');
		}
		testDetails = testDetails[0];
		const testObj = testDetails.toJSON();
		if (testDetails.testEnd) {
			console.log('error');
			throw new Error('Alloted time for questions is over');
		}
		if (testDetails.startDate) {
			const d = new Date(data.testStart); // get current date
			d.setHours(d.getHours(), d.getMinutes() + data.timeLimit, 0, 0);
			if (d <= new Date()) {
				throw new Error('Alloted time for questions is over');
			}
		}
		return testObj;
	},
	getUserTestHistory: async function (obj) {
		const offset = obj.page * obj.limit - obj.limit;
		var count = await userTestService.getUserTestCount({
			where: { ownerId: obj.userId },
		});
		var rows = await userTestService.getUserTest(offset, obj.limit, {
			include: {
				model: model.landingPage,
			},
			where: { ownerId: obj.userId },
			order: [['createdAt', 'DESC']],
		});

		return { rows, count };
	},
	getResults:async function () {
		try {
		  // Fetch all relevant test objects from your data source (e.g., database)
		  const allTestObjects = await model.userTest.findAll();
			console.log(allTestObjects);
		  const results = await Promise.all(
			allTestObjects.map(async (testObject) => {
			  try {
				// Process each test object using getResult function
				const result = await this.getResult(testObject);
				return result;
			  } catch (error) {
				// Handle errors for individual test objects
				console.error(`Error processing result for test ID ${testObject.id}:`, error.message);
				return null; // You can choose to return a default value or handle the error as needed
			  }
			})
		  );
	  
		  // Filter out any null results if you chose to handle errors within the map function
		  const validResults = results.filter((result) => result !== null);
	  
		  return validResults;
		} catch (error) {
		  console.error('Error fetching test objects:', error.message);
		  throw error;
		}
	  },
	getResult: async function (obj) {
		// try {
		var testDetails = await userTestService.getUserTest(0, 1, {
			where: { id: obj.id },
		});

		if (!testDetails.length) {
			throw new Error('Test Result is not avaialble anymore');
		}
		testDetails = testDetails[0];
		const dbObj = testDetails.toJSON();
		const testObj = dbObj.testObj;
		const resultArray = [];
		const totalStats = {
			totalQuestion: 0,
			totalAnswer: 0,
			timeTakenForTest: 0,
			totalPercentage: 0,
			totalCategories: 0,
		};
		Object.keys(testObj).map(function (categories) {
			const categoryResult = {
				category: categories,
			};
			var categoryQuestion = 0;
			var categoryAnswer = 0;
			if (
				testObj[categories]['freeText'] &&
				testObj[categories]['freeText'] == 1
			) {
			} else {
				Object.keys(testObj[categories]).map(function (questions) {
					const selectedAnswer = testObj[categories][questions]['selectAnswer'];
					totalStats.totalQuestion += 1;
					if (
						testObj[categories][questions][selectedAnswer] &&
						testObj[categories][questions].freeText == 0
					) {
						categoryQuestion += 10;
						// console.log(testObj[categories][questions][selectedAnswer]);
						if (selectedAnswer) {
							totalStats.totalAnswer += 1;
							categoryAnswer += parseInt(
								testObj[categories][questions][selectedAnswer]['points'] || 0
							);
						}
					}

				});
				categoryResult.percentage =
					(categoryAnswer / categoryQuestion) * 100
						? (categoryAnswer / categoryQuestion) * 100
						: 0;
				totalStats.totalPercentage =
					totalStats.totalPercentage + categoryResult.percentage;
				totalStats.totalCategories = totalStats.totalCategories + 1;
				Object.keys(dbObj.automaticText).map(function (texts) {
					if (dbObj.automaticText[texts]['category'] == categories) {
						console.log(
							'inside',
							categoryResult.percentage,
							'>=',
							dbObj.automaticText[texts]['min'],
							categoryResult.percentage,
							'<=',
							dbObj.automaticText[texts]['max']
						);

						if (
							categoryResult.percentage >= dbObj.automaticText[texts]['min'] &&
							categoryResult.percentage <= dbObj.automaticText[texts]['max']
						) {
							categoryResult.text = dbObj.automaticText[texts]['text'];
							console.log('categoryResult', categoryResult);
						}
					}
				});
				resultArray.push(categoryResult);
			}
		});
		if (testDetails.testEnd) {
			totalStats.timeTakenForTest = (
				Math.abs(
					new Date(testDetails.testEnd) - new Date(testDetails.testStart)
				) /
				1000 /
				60
			).toFixed(2);
		} else {
			totalStats.timeTakenForTest = dbObj.timeLimit;
		}
		// totalPercentage: 0,
		// totalCategories: 0
		return { ...dbObj, result: resultArray, resultStats: totalStats };
	},
	saveUserTest: async function (obj) {
		var testDetails = await userTestService.getUserTest(0, 1, {
			where: { id: obj.id },
		});
		if (!testDetails.length) {
			throw new Error('Invalid Test');
		}
		const updated = await userTestService.updateUserTest(obj, {
			where: { id: obj.id },
		});
		return updated;
	},
	deleteUserTestHistory: async function (obj) { },
};
