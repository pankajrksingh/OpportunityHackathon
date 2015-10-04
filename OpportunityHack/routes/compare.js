var	constants = require('../helper/constants');
var	mq_client = require('../rpc/client');

var QUEUE_NAME = constants.QUEUE_NAME;


module.exports = function(req,res){
	//console.log(req);
	
	if(!req.body.loaninfo){
		res.status(400).json({
			status : 400,
			message : constants.RES_MSG[400]
		});
	}else{

		var requested_loan = req.body.loaninfo.requested_loan;
		var downpayment_percent	= req.body.loaninfo.downpayment_percent;
		var months = req.body.loaninfo.months;
		var years = req.body.loaninfo.years;
		var frequency = req.body.loaninfo.frequency;
		
		
		var msg_payload = {
			operation : "compare",
			message : {
				requested_loan : requested_loan,
				downpayment_percent : downpayment_percent,
				months : months,
				years : years,
				frequency : frequency
			}
		};
		console.log(QUEUE_NAME.COMPARE);
		mq_client.make_request(QUEUE_NAME.COMPARE,msg_payload, function(err,results){
			if(err){
				res.status(err.status).json(err);
			}
			else 
			{
				res.status(200).json({
					status : 200,
					message : constants.RES_MSG[200]
				});
			}  
		});
	}
};