const { Op } = require("sequelize");
const model = require("../model");

module.exports = {
	duplicateTest: async function (id) {
		const test = await model.test.findByPk(id);
		const testObj = test.testObj;
		const newTest = await model.test.create({
			...test.dataValues,
			id: null,
			name: test.name + ' copy',
			testObj: testObj,
			...test
		});
		return newTest;
	},
	getUserAllPreviousQuestions: async function (userId) {
		const tests = await model.test.findAll({
			where: {
				createdById: userId,
			},
		});
		const questions = [];
		// for (const test of tests) {
		// 	const testObj = test.testObj;
		// 	}
		for (const test of tests) {
			const testObj = test.testObj;
			for (const category in testObj) {
				if (testObj.hasOwnProperty(category)) {
					questions.push({ ...testObj[category] });
				}
			}
		}
		return questions;

	},
	createTest: async function (obj, t) {
		console.log("obj", obj);
		if (obj.id === 0 || obj.id === undefined) {
			console.log(" creating obj", obj);
			// Create a new test
			try{
				await model.test.create(obj, {
					transaction: t,
				});
			}
			catch(e){
				console.log(e);
			}
		} else {
			// Update an existing test
			const testId = obj.id;
			console.log('updating test');
			delete obj.id; // Remove the id to prevent it from being updated
			await model.test.update(obj, {
				where: { id: testId },
				transaction: t,
			});
			return model.test.findByPk(testId);
		}
	},
	updateTest: async function (user, ids) {
		await model.test.update(
			{ createdById: user },
			{ where: { id: { [Op.in]: ids } } }
		);
		return model.test.findByPk(ids[0]);
	},

	getMyTest: async function (offset, limit, filter) {
		return await model.test.findAll({
			offset,
			limit,
			...filter
		});
	},
	getAllTest: async function (filter) {
		return await model.test.findAll({
			...filter
		});
	},
	deleteTest: async function (id) {
		return await model.test.destroy({
			where: {
				id: id,
			},
		});
	},
	getTests: async function () {
		const tests = await model.test.findAll();
		//embed owner email from user table as createdById
		const users = await model.user.findAll();
		const usersMap = {};
		users.forEach(user => {
			usersMap[user.id] = user.email;
		});
		tests.forEach(test => {
			test.dataValues.createdByEmail = usersMap[test.dataValues.createdById];
		});
		return tests;

	},
	getMyTestCount: async function (filter) {
		return await model.test.count(filter);
	},
	getMyTestSingle: async function (filter) {
		return await model.test.findOne(filter);
	},
	makeCreateTestObj: async function (obj) {
		var retObj = {

		}
		console.log("obj.questions", obj)
		Object.keys(obj.questions).map(function (key, i) {
			if (!obj.questions[key].categoryName) {
				obj.questions[key].categoryName = "No Category";
			}
			retObj[obj.questions[key].categoryName] ? "No Category" : retObj[obj.questions[key].categoryName] = {}

			if (!key.includes("answer") && obj.questions[key].categoryName) {

				retObj[obj.questions[key].categoryName][key] = {}
				retObj[obj.questions[key].categoryName][key] = {
					question: "",
					category: "No Category",
					freeText: 0,
					image: ""
				}
				// console.log("obj.freetext", obj.freeText);
				retObj[obj.questions[key].categoryName][key]["question"] = obj.questions[key]["question"];
				retObj[obj.questions[key].categoryName][key]["category"] = obj.questions[key]["categoryName"] || "No Category";
				retObj[obj.questions[key].categoryName][key]["image"] = obj.questions[key]["image"] || "";
				// console.log("obj.freeText", obj.freeText);
				// console.log('obj.freeText.hasOwnProperty(key)', obj.freeText.hasOwnProperty(key));
				// console.log('obj.freeText[key].freeText == 1', obj.freeText[key].freeText == 1);
				if (obj.freeText.hasOwnProperty(key) && obj.freeText[key].freeText == 1) {
					retObj[obj.questions[key].categoryName][key]["freeText"] = 1;
				}
			} else if (!key.includes("answer") && !obj.questions[key].categoryName) {

				retObj[key] = {
					question: obj.questions[key].question,
					freeText: 1,
					category: "No Category",
					image: obj.questions[key].image || ""
				}
			}
		})
		Object.keys(obj.questions).map(function (key, i) {
			console.log("obj.questions", obj.questions[key])

			if (key.includes("answer")) {
				var temp = key.split("-")
				const cat = obj.questions[temp[0]]["categoryName"] || "No Category";
				console.log(temp, cat);
				if (retObj[cat]) {
					retObj[cat][temp[0]] = {
						...retObj[cat][temp[0]],
						[temp[1]]: {
							answer: obj.questions[key]["answer"],
							points: obj.questions[key]["point"],
							image: obj.questions[key]["image"] || ""
						}
					}
				}
				else {
					retObj[temp[0]] = {
						...retObj[temp[0]],
						[temp[1]]: {
							answer: obj.questions[key]["answer"],
							points: obj.questions[key]["point"],
							image: obj.questions[key]["image"] || ""
						}
					}
				}
			}
		})
		console.log(retObj);
		return retObj;
	},
	//reverse of above function which takes the result of makecreatetestobj and converts it to the format of the frontend
	makeEditTestObj: async function (dbObject) {
		const editObj = {
			orientation: dbObject.orientation || 0,
			scoringType: dbObject.scoringType || 0,
			randomOrder: dbObject.randomOrder || 0,
			language: dbObject.language || 'english',
			timeLimit: dbObject.timeLimit || '',
			showuser: dbObject.showuser || 0,
			questions: {},
			resultStructure: {
				tableSummary: dbObject.resultStructure.tableSummary || false,
				graph: dbObject.resultStructure.graph || false
			},
			automaticText: dbObject.automaticText,
			sendAll: dbObject.sendAll || 0,
			freeText: {},
			beforeTestText: dbObject.beforeTestText || '',
			afterTestText: dbObject.afterTestText || '',
			name: dbObject.name || '',
			categoryStore: {},
			layout: {
				imageUrl: dbObject.layout.imageUrl || '',
				questionTextColor: dbObject.layout.questionTextColor || '',
				textColor: dbObject.layout.textColor || '',
				backgroundColor: dbObject.layout.backgroundColor || '',
				questionBackgroundColor: dbObject.layout.questionBackgroundColor || '',
				answerColor: dbObject.layout.answerColor || ''
			}
		};

		// Process questions
		if (dbObject.testObj) {
			for (const categoryName in dbObject.testObj) {
				console.log('categoryName');
				console.log(categoryName);
				if (dbObject.testObj.hasOwnProperty(categoryName)) {
					const category = dbObject.testObj[categoryName];
					if (category.freeText == 1) {
						// console.log('category');
						// console.log(category);
						editObj.freeText[categoryName] = category;
					}
					for (const questionKey in category) {
						if (category.hasOwnProperty(questionKey)) {
							const questionData = category[questionKey];

							// Check if the key includes "answer"
							// console.log('questoin data');
							// console.log(questionData);

							if (Object.keys(questionData).some(key => key.includes('answer'))) {
								if (!editObj.questions[questionKey]) {
									editObj.questions[questionKey] = {
										categoryName: categoryName,
									};
								}
								// Add answers to the question
								for (const answerKey in questionData) {
									// console.log(answerKey.freeText);
									if (questionData.hasOwnProperty(answerKey)) {
										if (answerKey.includes('answer')) {
											editObj.questions[questionKey + '-' + answerKey] = {
												answer: questionData[answerKey].answer,
												point: questionData[answerKey].points || null,
												image: questionData[answerKey].image || ''
											};
										} else if (answerKey !== 'category') {
											// Add other properties of the question
											editObj.questions[questionKey][answerKey] = questionData[answerKey];
										}
									}
								}
							} else {
								// If it's a regular question, create a question object
								if (questionData.hasOwnProperty('question')) {
									editObj.questions[questionKey] = {
										question: questionData.question,
										categoryName: categoryName,
										freeText: questionData.freeText || 0,
										image: questionData.image || ''
									};
								}
							}
						}
					}
				}
			}
		}
		// Process automaticText
		// for (const key in dbObject.automaticText) {
		// 	if (dbObject.automaticText.hasOwnProperty(key)) {
		// 		const textData = dbObject.automaticText[key];
		// 		editObj.automaticText[key] = {
		// 			min: textData.min,
		// 			max: textData.max,
		// 			text: textData.text,
		// 			category: textData.category
		// 		};
		// 	}
		// }
		console.log('dbObject.testObj');
		console.log(dbObject.testObj);
		// Process freeText
		for (const key in dbObject.freeText) {
			if (dbObject.freeText.hasOwnProperty(key)) {
				const freeTextData = dbObject.freeText[key];
				editObj.freeText[key] = {
					freeText: freeTextData.freeText
				};
			}
		}

		// Process categoryStore
		for (const catKey in dbObject.categoryStore) {
			if (dbObject.categoryStore.hasOwnProperty(catKey)) {
				const categoryData = dbObject.categoryStore[catKey];
				editObj.categoryStore[catKey] = {
					categoryName: categoryData.categoryName,
					noOfQuestion: categoryData.noOfQuestion
				};
			}
		}

		return editObj;

	},


};
