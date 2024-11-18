// Name testfactory
//Key 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
require('dotenv').config();
const axios = require('axios');
const model = require('../model');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	// host: 'smtp.mail.yahoo.com',
	// port: 465, // Yahoo SMTP server port
	// secure: true, // Use SSL/TLS
	service: process.env.EMAIL_SERVICE,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
});
// console.log('transporter',transporter);
// let creds = {
// 	method: 'post',
// 	maxBodyLength: Infinity,
// 	url: 'https://api.sendinblue.com/v3/smtp/email',
// 	headers: {
// 		'Content-Type': 'application/json',
// 		Accept: 'application/json',
// 		'api-key':
// 			'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',
// 		Cookie:
// 			'__cf_bm=vGKToEbO1004MQe.yy0HOG5bssMdE8tlkdnPawh563o-1680021111-0-AaCeT65i06iL5Jq+jSofrIkLAQDd47/KgPOL6CkTjMq3WpjeaCQ+4tnaznClaMcL3LDCIf0Gp9WB1yngiUWyt1s=',
// 	},
// };
// const sender = {
// 	name: 'Test Factory',
// 	email: 'Service@TestFactory.online',
// };

module.exports = {
	sendForgotVerificationToken: async function (obj, VerificationToken, language = 'english') {
		var data;
		if (language == 'hebrew') {
			data = {
				from: process.env.EMAIL_USER,
				to: obj.email,
				html: `Forgot Your Password?<br>
				  <a href="http://3.83.243.222/resetpassword?token=${VerificationToken}">
				  		Click here to reset your password
								</a>`,
			}

		} else {
			data ={
				from: process.env.EMAIL_USER,
				to: obj.email,
				html: `Forgot Your Password?<br>
				  <a href="http://3.83.243.222/resetpassword?token=${VerificationToken}">
				  		Click here to reset your password
								</a>`,
			}
		}
		transporter.sendMail(data, function (error, info) {
			if (error) {
				console.error('Error sending email: ' + error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

	},
	
	sendVerificationToken: async function (obj, VerificationToken, language = 'english') {
		console.log('inside');
		var data;
		if (language == 'hebrew') {
			data = {
				from: process.env.EMAIL_USER,
				to: obj.email,
				html: `
				  Congratulations on your registration on the Test Factory website!<br>
				  <a href="http://3.83.243.222/verify?token=${VerificationToken}">
					Click here to verify your email
				  </a>
				`,
				subject: 'Click to verify your email',
			};
		} else {
			data = {
				from: process.env.EMAIL_USER,
				to: obj.email,
				html: `
				  Congratulations on your registration on the Test Factory website!<br>
				  <a href="http://3.83.243.222/verify?token=${VerificationToken}">
					Click here to verify your email
				  </a>
				`,
				subject: 'Click to verify your email',
			};
		}

		transporter.sendMail(data, function (error, info) {
			if (error) {
				console.error('Error sending email: ' + error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
		// var config = {
		// 	...creds,
		// 	data: data,
		// };
		// axios
		// 	.request(config)
		// 	.then((response) => {
		// 		console.log(JSON.stringify(response.data));
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	},
	sendUserInfo: async function (email, testname, obj) {
		const data = {
			to: email,
			from: process.env.EMAIL_USER,
			html: "A user contacted you on your Landing Page for TEST :" + testname + ", <br> " +
				"<p>First Name : " + obj.firstName + "</p>" +
				"<p>Last Name : " + obj.lastName + "</p>" +
				"<p>Email : " + obj.email + "</p>" +
				"<p>Phone Number : " + obj.phoneNumber + "</p>" +
				"<p>Term And Condition : " + obj.termAndCondition + "</p>",
			subject: 'User Contacted you',
		};
		transporter.sendMail(data, function (error, info) {
			if (error) {
				console.error('Error sending email: ' + error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	},

	sendRegisterEmail: async function (to, name, link, language) {
		var data;
		if (language == 'hebrew') {
			data = {
				to: to,
				from: process.env.EMAIL_USER,
				html:
					"ברכות על הרשמתך לאתר YouTest <br> <a href= ' " +
					link +
					"'לחץ כאן על מנת לאמת את תיבת המייל שלך </a>",
				subject: 'Registered Successfully',
			};
		} else {
			data = {
				to: to,
				from: process.env.EMAIL_USER,
				html:
					"Congratulations on your registration on the Test Factory website, <br> <a href= ' " +
					link +
					"'</a>",
				subject: 'Registered Successfully',
			};
		}
		transporter.sendMail(data, function (error, info) {
			if (error) {
				console.error('Error sending email: ' + error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	},
	sendTestInitiateEmail: async function (to, name, link, language, testNo) {
		console.log('sendtestinitialemail');
		var data;
		if (language == 'hebrew') {
			data = {
				to: to,
				from: process.env.EMAIL_USER,
				html:
					"ברכות על הרשמתך לאתר YouTest <br> <a href= ' " +
					link +
					"'לחץ כאן על מנת לאמת את תיבת המייל שלך </a>",
				subject: 'Registered Successfully',
			};
		} else {
			data = {
				to: to,
				from: process.env.EMAIL_USER,
				html:
					"<table style='width: 100%;text-align: center;'> <tr style='background-color: #FF9000;color: white;'><td style='border: 1px solid black'>Link to the test</td></tr> <tr style='height: 100px;'><td><h2>Congratulations, you have received an invitation for the test, click <a href= ' " +
					link +
					"'>here</a> to start </h2></td></tr> <tr style='background-color: #FF9000;color: white;'><td style='border: 1px solid black'>Youtest.online © 2018</td></tr> </table>",
				subject: 'Test No ' + testNo,
			};
		}
		transporter.sendMail(data, function (error, info) {
			if (error) {
				console.error('Error sending email: ' + error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	},
	sendTestResultEmail: async function (emailObj) {
		var data;
		emailObj = emailObj.toJSON();
		console.log(emailObj);
		const htmlContent = await this.testResultFormat(emailObj);
		// console.log(htmlContent);
		console.log('emailObj', emailObj.body.number);
		var language = 'english';
		if (language == 'hebrew') {
			data =
			{
				to: emailObj.to,
				from: process.env.EMAIL_USER,
				html: htmlContent,
				subject: 'Test No ' + emailObj.body.number + ' is complete',
			};
		} else {
			data =
			{
				to: emailObj.to,
				from: process.env.EMAIL_USER,
				html: htmlContent,
				subject: 'Test No ' + emailObj.body.number + ' is complete',
			};
		}
		transporter.sendMail(data, function (error, info) {
			if (error) {
				console.error('Error sending email: ' + error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
		return emailObj;
	},
	testResultFormat: function (emailObj) {
		// emailObj.body.language = 'english'; alogn left else right all text and text change also
		var html = "";
		if (emailObj.body.language == 'english' ){html += `<div>
        <div style="direction:rtl;text-align:center;text-align:left;direction:ltr"><img style="height:80px;width:200px"
                src="https://ci4.googleusercontent.com/proxy/fI11_M8pgArxrER6Uu2pbxBIjtzcGjTzuJ5ZfS_sntyjeFW8L781HYutoY90f2EDytwTOeYIX7DO=s0-d-e1-ft#https://youtest.online/images/logo.png"><br><br>
            <a href="mailto:${emailObj.to}" target="_blank">${emailObj.body.email}</a> finished answering the questions and below are his results:
        </div><br>
        <table width="60%" align="center" border="1" cellspacing="0" cellpadding="10"
            style="font-family:Arial,Helvetica,sans-serif;text-align:left;direction:ltr">
            <tbody>
                <tr>
                    <td colspan="3">
                        <div align="center" style="direction:rtl;text-align:left;direction:ltr"> Name:
                        ${emailObj.body.additionalDetails.name}<br>Email: <a href="mailto:${emailObj.body.email}"
                                target="_blank">${emailObj.body.email}</a></div>
                    </td>
                </tr>
                <tr bgcolor="#114e8e">
                    <td>
                        <div align="center" style="color:#fff;direction:rtl;text-align:left;direction:ltr">
                            Grade</div>
                    </td>
                    <td>
                        <div align="center" style="color:#fff;direction:rtl;text-align:left;direction:ltr">
                            category</div>
                    </td>
                    <td>
                        <div align="center" style="color:#fff;direction:rtl;text-align:left;direction:ltr">
                            The name of the test</div>
                    </td>
                </tr>`;
	}
	else{
		html += `<div>
		<div style="direction:rtl;text-align:center;text-align:right;direction:ltr"><img style="height:80px;width:200px"
				src="https://ci4.googleusercontent.com/proxy/fI11_M8pgArxrER6Uu2pbxBIjtzcGjTzuJ5ZfS_sntyjeFW8L781HYutoY90f2EDytwTOeYIX7DO=s0-d-e1-ft#https://youtest.online/images/logo.png"><br><br>
			<a href="mailto:${emailObj.to}" target="_blank">${emailObj.body.email}</a> סיים לענות על השאלות ולהלן התוצאות שלו:
		</div><br>
		<table width="60%" align="center" border="1" cellspacing="0" cellpadding="10"
			style="font-family:Arial,Helvetica,sans-serif;text-aliright;direction:ltr">
			<tbody>
				<tr>
					<td colspan="3">
						<div align="center" style="direction:rtl;text-align:right;direction:ltr"> שם:
						${emailObj.body.additionalDetails.name}<br>אימייל: <a href="mailto:${emailObj.body.email}"	
								target="_blank">${emailObj.body.email}</a></div>
					</td>
				</tr>
				<tr bgcolor="#114e8e">
					<td>
						<div align="center" style="color:#fff;direction:rtl;text-align:right;direction:ltr">
							ציון</div>
					</td>
					<td>
						<div align="center" style="color:#fff;direction:rtl;text-align:right;direction:ltr">
							קטגוריה</div>
					</td>
					<td>
						<div align="center" style="color:#fff;direction:rtl;text-align:right;direction:ltr">
							שם המבחן</div>
					</td>
				</tr>`;
	}


		var totalScore = 0;
		var totalCat = 0;

		for (let singleKey of emailObj.body.result) {
			totalScore += singleKey.percentage;
			++totalCat;
			if (emailObj.body.language == 'english' ){
				html += `
				<tr>
					<td>
						<div align="center" style="direction:rtl;text-align:left;direction:ltr"> ${singleKey.percentage}%</div>
					</td>
					<td>
						<div align="center" style="direction:rtl;text-align:left;direction:ltr"> ${singleKey.category}</div>
					</td>
					<td>
						<div align="center" style="direction:rtl;text-align:left;direction:ltr"> ${emailObj.body.name}</div>
					</td>
				</tr>`;
			}
			else{
				html += `
				<tr>
					<td>
						<div align="center" style="direction:rtl;text-align:right;direction:ltr"> ${singleKey.percentage}%</div>
					</td>
					<td>
						<div align="center" style="direction:rtl;text-align:right;direction:ltr"> ${singleKey.category}</div>
					</td>
					<td>
						<div align="center" style="direction:rtl;text-align:right;direction:ltr"> ${emailObj.body.name}</div>
					</td>
				</tr>`;
			}
		}
		if(emailObj.body.language == 'english' ){
			html += `<tr style="background-color:#ffff00">
					<td>
						<div align="center" style="direction:rtl;text-align:left;direction:ltr"> ${totalScore / totalCat
				} %</div>
					</td>
					<td>
						<div align="center" style="direction:rtl;text-align:left;direction:ltr"> Total score
						</div>
					</td>
					<td>
						<div align="center" style="direction:rtl;text-align:left;direction:ltr"> ${emailObj.body.name
				} <br>
						</div>
					</td>
				</tr>
				<tr bgcolor="#114e8e" cellpadding="10">
					<td colspan="3">
						<div align="center" style="color:#fff;direction:rtl;text-align:left;direction:ltr">
							Testee's Comments</div>
					</td>
				</tr>`;
		}
		else{
			html += `<tr style="background-color:#ffff00">
					<td>
						<div align="center" style="direction:rtl;text-align:right;direction:ltr"> ${totalScore / totalCat
				} %</div>
					</td>
					<td>
						<div align="center" style="direction:rtl;text-align:right;direction:ltr"> ציון כולל
						</div>
					</td>
					<td>
						<div align="center" style="direction:rtl;text-align:right;direction:ltr"> ${emailObj.body.name
				} <br>
						</div>
					</td>
				</tr>
				<tr bgcolor="#114e8e" cellpadding="10">
					<td colspan="3">
						<div align="center" style="color:#fff;direction:rtl;text-align:right;direction:ltr">
							הערות המבחן</div>
					</td>
				</tr>`;
		}
		
		html += `<tr cellpadding="10">
				<td colspan="3" style="direction:rtl;padding:10px">`;
		for (let category in emailObj.body.testObj) {
			// Loop through the questions in the current category
			for (let questionKey in emailObj.body.testObj[category]) {
				const question = emailObj.body.testObj[category][questionKey];

				// Check if freeText is 1
				if (question.freeText === 1) {
					// Include the question and answer in the HTML
					if(emailObj.body.language == 'english' ){
						html += `
								  <p style="text-align:left; direction:ltr">
									<b>${question.question}</b><br>
									Answer: ${question.selectAnswer}
								  </p>`;
					}
					else{
						html += `
								  <p style="text-align:right; direction:rtl">
									<b>${question.question}</b><br>
									${question.selectAnswer}: תשובה	
								  </p>`;
					}
				}
			}
		}
		html += `</td></tr>`;

		html += `<tr bgcolor="#114e8e">
                    <td colspan="3">
					${emailObj.body.language == 'english' ? `<div align="center" style="color:#fff;direction:rtl;text-align:left;direction:ltr"> Graph</div>` : `<div align="center" style="color:#fff;direction:rtl;text-align:right;direction:ltr"> גרף</div>`}
                    </td>
                </tr>
                <tr>
                    <td colspan="3" style="direction:rtl"><br> <a
                            href="http://3.83.243.222/resultpage/${emailObj.body.id
			}"
                            target="_blank">
							${emailObj.body.language=='english'?'Click here to see the graph':'לחץ כאן לראות את הגרף'}
							
							</a> <br></td>
                </tr>
                <tr bgcolor="#114e8e">
                    <td colspan="3">
					${emailObj.body.language=='english'?`<div align="center" style="color:#fff;direction:rtl;text-align:left;direction:ltr"> Additional comments</div>`:`<div align="center" style="color:#fff;direction:rtl;text-align:right;direction:ltr"> הערות נוספות</div>`}
                    </td>
                </tr>
                <tr style="direction:rtl">
                <td colspan="3" style="direction:rtl;white-space:pre-wrap">`;
		// Object.keys(emailObj.result).map(function (singleKey) {

		// })
		for (let singleKey of emailObj.body.result) {
			singleKey.category ? (html += `<b>${singleKey.category}<b/> - `) : '';
			singleKey.percentage ? (html += `<p >${singleKey.percentage}%</p><br/>`) : '';
			singleKey.text ? (html += `<p style="font-weight:400">${singleKey.text}<p><br/>`) : '';
		}
		const selectedAnswers = [];

		for (const key in emailObj.body.testObj) {
			for (const questionKey in emailObj.body.testObj[key]) {
				const answer = emailObj.body.testObj[key][questionKey][emailObj.body.testObj[key][questionKey]["selectAnswer"]].answer;
				selectedAnswers.push(answer);
			}
		}
		// console.log( emailObj.body.automaticText);
		for (const key in emailObj.body.automaticText) {
			// console.log('key', key);
			if (key.includes('qcondition')) {

				const questionAnswer = emailObj.body.automaticText[key].questionAnswer;
				// console.log('jete')

				if (selectedAnswers.includes(questionAnswer)) {
					const text = emailObj.body.automaticText[key].text;
					html += `<b>${text}<b/><br/>`;
				}
			}
		}

		html += `</td></tr>`;
		if (emailObj.body.email != emailObj.to || emailObj.body.showuser) {
			
			if(emailObj.body.language == 'english' ){
				html +=
				`
			<tr >
				<td colspan="3">
				 		<div align="center" style="background-color:#114e8e;color:#fff;text-align:left;direction:ltr"> Answer Report
						for Admin</div>
				`
			}
			else{
				html +=
				`
			<tr >
				<td colspan="3">
						<div align="center" style="background-color:#114e8e;color:#fff;text-align:right;direction:ltr"> דוח תשובות
						למנהל</div>
				`
			}
			for (let category in emailObj.body.testObj) {
				// Loop through the questions in the current category
				for (let questionKey in emailObj.body.testObj[category]) {
					const question = emailObj.body.testObj[category][questionKey];

					if (question.freeText === 1) {
						html += `
								  <p style="text-align:left; direction:ltr">
									<b>${question.question}</b><br>
									Answer: ${question.selectAnswer}
								  </p>`;
					}
					else {
						let color = 'red';
						if (question[question.selectAnswer].points >= 10) {
							color = 'green';
						}
						else if (question[question.selectAnswer].points >= 1) {
							color = 'yellow';
						}
						if (emailObj.body.language == 'english' ){
							html += `
								  <p style="text-align:left; direction:ltr">
									<b>${question.question}</b><br>
									<p style="font-weight:400;color:${color}">Answer: ${question[question.selectAnswer].answer}<p><br>
								  </p>`;
						}
						else{
							html += `
								  <p style="text-align:right; direction:ltr">
									<b>${question.question}</b><br>
									<p style="font-weight:400;color:${color};text-align:right; direction:ltr"> ${question[question.selectAnswer].answer}${" : "} תשובה    <p><br>
								  </p>`;
						}
					}
				}
			}
			html += `</td></tr>`;
		}
		html += ` <tr>
                    <td colspan="3" bgcolor="#114e8e">
                        <div align="center" style="color:#fff;text-align:left;direction:ltr"> <a
                                href="http://3.83.243.222" style="color:#fff"
                                target="_blank">
								${emailObj.body.language=='english'?'Terms of use and service':'תנאי שימוש ושירות'}
								</a></div>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" bgcolor="#114e8e">
                        <div align="center" style="color:#fff;text-align:left;direction:ltr"> TestFactory
                            © 2023</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>`;
		return html;
	},
	create: async function (obj, t) {
		return await model.email.create(obj, { transaction: t });
	},
	createBulk: async function (obj, t) {
		return await model.email.bulkCreate(obj, {
			transaction: t,
		});
	},
};
