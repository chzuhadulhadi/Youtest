// Name testfactory
//Key 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

const axios = require('axios');
const model = require('../model');

let creds = {
	method: 'post',
	maxBodyLength: Infinity,
	url: 'https://api.sendinblue.com/v3/smtp/email',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'api-key':
			'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',
		Cookie:
			'__cf_bm=vGKToEbO1004MQe.yy0HOG5bssMdE8tlkdnPawh563o-1680021111-0-AaCeT65i06iL5Jq+jSofrIkLAQDd47/KgPOL6CkTjMq3WpjeaCQ+4tnaznClaMcL3LDCIf0Gp9WB1yngiUWyt1s=',
	},
};
const sender = {
	name: 'Test Factory',
	email: 'Service@TestFactory.online',
};

module.exports = {
	sendVerificationToken: async function (obj, VerificationToken, language = 'english') {
		var data;
		if (language == 'hebrew') {
			data = JSON.stringify({
				sender,
				to: [
					{
						email: to,
						name: name,
					},
				],
				htmlContent:
					"ברכות על הרשמתך לאתר YouTest <br> <a href= ' " +
					link +
					"'לחץ כאן על מנת לאמת את תיבת המייל שלך </a>",
				subject: 'Registered Successfully',
			});
		} else {
			data = JSON.stringify({
				sender: sender,
				to: [
					{
						email: obj.email,
						name: obj.name,
					},
				],
				htmlContent: `
				  Congratulations on your registration on the Test Factory website!<br>
				  <a href="http://localhost:3000/verify?token=${VerificationToken}">
					Click here to verify your email
				  </a>
				`,
				subject: 'Click to verify your email',
			});

		}
		var config = {
			...creds,
			data: data,
		};
		axios
			.request(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
			})
			.catch((error) => {
				console.log(error);
			});
	},
	// UserActivation: async function (VerificationToken) {

	// }

	sendRegisterEmail: async function (to, name, link, language) {
		var data;
		if (language == 'hebrew') {
			data = JSON.stringify({
				sender,
				to: [
					{
						email: to,
						name: name,
					},
				],
				htmlContent:
					"ברכות על הרשמתך לאתר YouTest <br> <a href= ' " +
					link +
					"'לחץ כאן על מנת לאמת את תיבת המייל שלך </a>",
				subject: 'Registered Successfully',
			});
		} else {
			data = JSON.stringify({
				sender: sender,
				to: [
					{
						email: to,
						name: name,
					},
				],
				htmlContent:
					"Congratulations on your registration on the Test Factory website, <br> <a href= ' " +
					link +
					"'</a>",
				subject: 'Registered Successfully',
			});
		}
		var config = {
			...creds,
			data: data,
		};
		axios
			.request(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
			})
			.catch((error) => {
				console.log(error);
			});
	},
	sendTestInitiateEmail: async function (to, name, link, language, testNo) {
		console.log('sendtestinitialemail');
		var data;
		if (language == 'hebrew') {
			data = JSON.stringify({
				sender,
				to: [
					{
						email: to,
						name: name,
					},
				],
				htmlContent:
					"ברכות על הרשמתך לאתר YouTest <br> <a href= ' " +
					link +
					"'לחץ כאן על מנת לאמת את תיבת המייל שלך </a>",
				subject: 'Registered Successfully',
			});
		} else {
			data = JSON.stringify({
				sender: sender,
				to: [
					{
						email: to,
						name: name,
					},
				],
				htmlContent:
					"<table style='width: 100%;text-align: center;'> <tr style='background-color: #FF9000;color: white;'><td style='border: 1px solid black'>Link to the test</td></tr> <tr style='height: 100px;'><td><h2>Congratulations, you have received an invitation for the test, click <a href= ' " +
					link +
					"'>here</a> to start </h2></td></tr> <tr style='background-color: #FF9000;color: white;'><td style='border: 1px solid black'>Youtest.online © 2018</td></tr> </table>",
				subject: 'Test No ' + testNo,
			});
		}
		var config = {
			...creds,
			data: data,
		};
		axios
			.request(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
			})
			.catch((error) => {
				console.log(error);
			});
	},
	sendTestResultEmail: async function (emailObj) {
		try {
			var data;
			emailObj = emailObj.toJSON();
			const htmlContent = await this.testResultFormat(emailObj);
			console.log('emailObj', emailObj);
			var language = 'english';
			if (language == 'hebrew') {
				data = JSON.stringify({
					sender,
					to: [
						{
							email: to,
							name: emailObj.body.additionalDetails.name,
						},
					],
					htmlContent:
						"ברכות על הרשמתך לאתר YouTest <br> <a href= ' " +
						link +
						"'לחץ כאן על מנת לאמת את תיבת המייל שלך </a>",
					subject: 'Registered Successfully',
				});
			} else {
				data = JSON.stringify({
					sender: sender,
					to: [
						{
							email: emailObj.to,
							name: emailObj.body.additionalDetails.name,
						},
					],
					htmlContent,
					subject: 'Test No ' + emailObj.id + ' is complete',
				});
			}
			var config = {
				...creds,
				data: data,
			};
			axios
				.request(config)
				.then((response) => {
					console.log(JSON.stringify(response.data));
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (e) {
			console.log('e', e);
		}
	},
	testResultFormat: function (emailObj) {
		var html = `<div>
        <div style="direction:rtl;text-align:center;text-align:left;direction:ltr"><img style="height:80px;width:200px"
                src="https://ci4.googleusercontent.com/proxy/fI11_M8pgArxrER6Uu2pbxBIjtzcGjTzuJ5ZfS_sntyjeFW8L781HYutoY90f2EDytwTOeYIX7DO=s0-d-e1-ft#https://youtest.online/images/logo.png"><br><br>
            <a href="mailto:${emailObj.to}" target="_blank">${emailObj.to}</a> finished answering the questions and below are his results:
        </div><br>
        <table width="60%" align="center" border="1" cellspacing="0" cellpadding="10"
            style="font-family:Arial,Helvetica,sans-serif;text-align:left;direction:ltr">
            <tbody>
                <tr>
                    <td colspan="3">
                        <div align="center" style="direction:rtl;text-align:left;direction:ltr"> Name:
                        ${emailObj.body.additionalDetails.name}<br>Email: <a href="mailto:${emailObj.to}"
                                target="_blank">${emailObj.to}</a></div>
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
		console.log('11111111111111111111111111111111111111', emailObj.body.result);
		// Object.keys(emailObj.result).map(function (singleKey) {
		var totalScore = 0;
		var totalCat = 0;

		for (let singleKey of emailObj.body.result) {
			totalScore += singleKey.percentage;
			++totalCat;
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
                            Additional Comments</div>
                    </td>
                </tr>
                <tr cellpadding="10">
                    <td colspan="3" style="direction:rtl;padding:10px">
                        <p style="text-align:left;direction:ltr"> <b>${emailObj.body.additionalDetails.note
			}</b><br>
                            </p><br>
                    </td>
                </tr>
                <tr bgcolor="#114e8e">
                    <td colspan="3">
                        <div align="center" style="color:#fff;direction:rtl;text-align:left;direction:ltr">
                            graph</div>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" style="direction:rtl"><br> <a
                            href="http://18.140.56.176/resultpage/${emailObj.body.id
			}"
                            target="_blank">Click here to get the results in a graph</a> <br></td>
                </tr>
                <tr bgcolor="#114e8e">
                    <td colspan="3">
                        <div align="center" style="color:#fff;direction:rtl;text-align:left;direction:ltr">
                            examinee's comments </div>
                    </td>
                </tr>
                <tr style="direction:rtl">
                <td colspan="3" style="direction:rtl;white-space:pre-wrap">`;
		// Object.keys(emailObj.result).map(function (singleKey) {

		// })
		for (let singleKey of emailObj.body.result) {
			singleKey.text ? (html += `${singleKey.text}<br>`) : '';
		}

		html += `</td></tr>
                <tr bgcolor="#114e8e">
                    <td colspan="3">
                        <div align="center" style="color:#fff;text-align:left;direction:ltr"> Answer Report
                            for Admin</div>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" bgcolor="#114e8e">
                        <div align="center" style="color:#fff;text-align:left;direction:ltr"> <a
                                href="http://18.140.56.176" style="color:#fff"
                                target="_blank">Terms of use and service</a></div>
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
