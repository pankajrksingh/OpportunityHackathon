var constants = require('../helper/constants');

exports.execute_request = function(req,callback){
	'use strict';
	var operation = req.operation;
	var message = req.message;
	switch(operation){

	case "compare" : 
		compare(message,callback);
		break;
		
	default : 
		callback({status : 400,message : constants.RES_MSG[400]});
	}
};

/**Compare**/
function compare(msg,callback){
	
//	var queryParam = {
//			requested_loan		: msg.requested_loan,
//			downpayment_percent	: msg.downpayment_percent,
//			months		: msg.months,
//			years		: msg.years,
//			frequency	: msg.frequency
//
//	};
	
	
//	
	callback({status : 200,message : constants.RES_MSG[200]});
/*
	mysql.query("UPDATE ?? SET ? WHERE ?? = ?",['person',queryParam,'person_id',msg.person_id],function(err,response) {
		if (err) {
			console.log("Error while perfoming query !!!");
			callback({status : 500,message : constants.RES_MSG[500]});
		} else{
			callback({status : 200,message : constants.RES_MSG[200]});
		}
	});
	*/
}


exports.interest_opportunityfund = function(msg,callback){
   //console.log(request.param("requested_loan"));
   var loan_amount = msg.requested_loan;
   var down_percent = msg.downpayment_percent;
   
   var frequency = msg.frequency;
   
   var first_slab = require('./app').FIRST_SLAB;
   var total_downpayment = (down_percent/100)*loan_amount;
   var loan_type= msg.loan_use;
   
   var cash_needed = loan_amount - total_downpayment;
   var loan_fee;
   if(cash_needed >= first_slab)
       loan_fee = 0.05 * cash_needed;
   else if(cash_needed >= 30000)
       loan_fee = 0.05 * cash_needed;
   else if(cash_needed >= 20000)
       loan_fee = 0.05 * cash_needed;
   else if(cash_needed >= 10000)
       loan_fee = 0.05 * cash_needed;
   else if(cash_needed >= 5001)
       loan_fee = 0.05 * cash_needed;
   else if(cash_needed >= 2501)
       loan_fee = 75;
   else if(cash_needed >= 1000)
       loan_fee = 50;
   else
       loan_fee = 0;
                   
               
   var amount_financed = cash_needed + loan_fee;
   var interest_rate;
   if(!loan_type.localecompare("Vehicle/Equip."))
   {
       if(cash_needed < 2501)
           interest_rate = 0.18;
       else if (cash_needed < 5000)
           interest_rate = 0.18;
       else if (cash_needed < 10000)
           interest_rate = 0.15;
       else if (cash_needed < 20000)
           interest_rate = 0.12;
       else if(cash_needed < 30000)
           interest_rate = 0.1;
       else
           interest_rate = 0.095;
       
   }
   else
   {
       if(amount_financed >= 10000)
           interest_rate = 0.1050;
       else
           interest_rate = 0.1200;
   }
   
   //if(frequency.localecompare("monthly"))
       
   
}



/**
 * execute request handling
 */
exports.execute_request = function(req,callback){
	//'use strict';
	console.log(req);
	var operation = req.operation;
	var message = req.message;

	switch(operation){

	case "compare" : 
		compare(message,callback);
		break;
		
	default : 
		callback({status : 400,message : constants.RES_MSG[400]});
	}
};

