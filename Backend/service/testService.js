const { Op } = require("sequelize");
const model = require("../model");

module.exports = {
	createTest: async function (obj, t) {
		if (obj.id === 0) {
			// Create a new test
			return await model.test.create(obj, { transaction: t });
		} else {
			// Update an existing test
			const testId = obj.id;
			console.log(obj);
			delete obj.id; // Remove the id to prevent it from being updated
			await model.test.update(obj, {
				where: { id: testId },
				transaction: t,
			});
			return model.test.findByPk(testId);
		}
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
			if (obj.questions[key].categoryName) {
				retObj[obj.questions[key].categoryName] ? "" : retObj[obj.questions[key].categoryName] = {}
			}

			if (!key.includes("answer") && obj.questions[key].categoryName) {

				retObj[obj.questions[key].categoryName][key] = {}
				retObj[obj.questions[key].categoryName][key] = {
					question: "",
					category: "",
					freeText: 0,
					question: ""
				}
				retObj[obj.questions[key].categoryName][key]["question"] = obj.questions[key]["question"];
				retObj[obj.questions[key].categoryName][key]["category"] = obj.questions[key]["categoryName"];

			} else if (!key.includes("answer") && !obj.questions[key].categoryName) {

				retObj[key] = {
					question: obj.questions[key].question,
					freeText: 1,
				}
			}

		})
		Object.keys(obj.questions).map(function (key, i) {
			console.log("obj.questions", obj.questions[key])

			if (key.includes("answer")) {
				var temp = key.split("-")
				const cat = obj.questions[temp[0]]["categoryName"]

				retObj[cat][temp[0]] = {
					...retObj[cat][temp[0]],
					[temp[1]]: {
						answer: obj.questions[key]["answer"],
						points: obj.questions[key]["point"]
					}

				}
			}
		})

		return retObj;
	},
	//reverse of above function which takes the result of makecreatetestobj and converts it to the format of the frontend
	makeEditTestObj: async function (dbObject) {
		const editObj = {
			orientation: dbObject.orientation || 0,
			scoringType: dbObject.scoringType || 0,
			randomOrder: dbObject.randomOrder || 0,
			timeLimit: dbObject.timeLimit || '',
			questions: {},
			resultStructure: {
				tableSummary: dbObject.resultStructure?.tableSummary || false,
				graph: dbObject.resultStructure?.graph || false
			},
			automaticText: {},
			freeText: {},
			beforeTestText: dbObject.beforeTestText || '',
			afterTestText: dbObject.afterTestText || '',
			name: dbObject.name || '',
			categoryStore: {},
			layout: {
				questionTextColor: dbObject.layout?.questionTextColor || '',
				textColor: dbObject.layout?.textColor || '',
				backgroundColor: dbObject.layout?.backgroundColor || '',
				questionBackgroundColor: dbObject.layout?.questionBackgroundColor || '',
				answerColor: dbObject.layout?.answerColor || ''
			}
		};

		// Process questions
		if (dbObject.testObj) {
			for (const categoryName in dbObject.testObj) {
				console.log('categoryName');
				console.log(categoryName);
				if (dbObject.testObj.hasOwnProperty(categoryName)) {
					const category = dbObject.testObj[categoryName];
					if(category.freeText==1)
					{
						// console.log('category');
						// console.log(category);
						editObj.freeText[categoryName]=category;
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
										freeText: questionData.freeText || 0
									};
								}
							}
						}
					}
				}
			}
		}
		// Process automaticText
		for (const key in dbObject.automaticText) {
			if (dbObject.automaticText.hasOwnProperty(key)) {
				const textData = dbObject.automaticText[key];
				editObj.automaticText[key] = {
					min: textData.min,
					max: textData.max,
					text: textData.text,
					category: textData.category
				};
			}
		}

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
