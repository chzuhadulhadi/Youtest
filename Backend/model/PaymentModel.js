const packageService = require('../service/packageService');
const userModel=require('../service/userService');
const paymentService=require('../service/paymentService');
const axios=require('axios');
module.exports = {
	handlePayment:async function handlePayment(obj,userId,countryCode)
	{
		const user=await userModel.getAgentById(userId);
		const package=await packageService.getPackageById(obj);
		//make api call to payment gateway
		//if successfull then
		//update payment table
		//update user table
		const paymentRoute=" https://icredit.rivhit.co.il/API/PaymentPageRequest.svc/GetUrl";
		const dataObj={
				GroupPrivateToken: "f87465ba-e155-4b74-a5ca-2192c84ef0fb",
				Currency: "2",
				RedirectURL: "https://youtest-git-main-zuhads-projects.vercel.app/dashboard/paymentsucess",
				FailRedirectURL: "https://youtest-git-main-zuhads-projects.vercel.app/dashboard/paymentfail",
				IPNURL: "https://testfactory.online/api/ipn-handler",
				CustomerFirstName: user.firstName,
				CustomerLastName: user.lastName,
				ExemptVAT: false,
				PriceIncludeVAT: countryCode === 'il' ? false : true,
				MaxPayments: "3",
				SaleType: 1,
				HideItemList: true,
				SendMail: true,
				Custom1: user.id,
				Custom2: package.id,
				EmailAddress: user.email,
				Items: [
				  {
					// Id: package.id,
					UnitPrice: package.packagePrice,
					Quantity: "1",
					Description: package.packageName,
				  }
				]
		};
		try{
			const response=await axios.post(paymentRoute,dataObj);
			console.log(response.data);
			return response.data;
		}
		catch(e)
		{
			console.error('Error in makePaymentGatewayApiCall:', error);
			throw new Error('Failed to make payment gateway API call');
		}
		// return user;
	},
	getPackage:async function getPackage(userId)
	{	
		// console.log(userId);
		// const user=await userModel.getAgentById(userId);
		// const package=await packageService.getPackageById(user.packageId);
		const payment=await paymentService.getPackage(userId);
		// console.log(payment);
		return payment;
	},

};
