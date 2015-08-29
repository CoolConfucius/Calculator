$(document).ready(init); 
function init () {		
	var display = 'O'; 
	var num1 = []; 
	var num2 = []; 
	var op = ''; 
	var next = false; 
	var isDecimal1 = false; 
	var isDecimal2 = false; 
	var ready = false; 	
	var neg1 = false; 
	var neg2 = false; 	
	$('button').click(function(event){
		var $show = $('#screen'); 
		var $buttonPressed = $(this);
		var text = $buttonPressed.text(); 
		if ($buttonPressed.hasClass('num')) {
			if (next === false) {	
	  			display = pressNum(num1, text); 
  				$show.text(display);	
			};	
			if (next === true) {										
				ready = true; 
		  		display = pressNum(num2, text); 
	  			$show.text(display);
			};		
		};		
		if ($buttonPressed.hasClass('op')) {
			next = true; 						
			op = text;					  		
		};
		if ($buttonPressed.hasClass('equal')) {
			if (ready === true) {
				var solution; 				
				solution = doMath(num1, op, num2); 
				display = solution.toString(); 
				num1 = display.split(''); 
				num2 = []; 
				neg2 = false; 
				isDecimal2 = false;
				next = false;  				
				$show.text(display);
			};			
		};
		if ($buttonPressed.hasClass('ac')) {
			display = 'O'; 
			next = false; 
			isDecimal1 = false; 
			isDecimal2 = false; 
			resetBool = false; 
			ready = false; 
			neg1 = false; 
			neg2 = false; 
			num1 = []; 
			num2 = []; 
			op = ''; 			
			$show.text(display);
		};
		if ($buttonPressed.hasClass('neg')) {			
			if (next) {
				if (neg2) {
					neg2 = false; 
					num2.shift(); 
				} else {
					neg2 = true; 
					num2.unshift('-');
				}
				display = num2.join('');			
			} else {
				if (neg1) {
					neg1 = false; 
					num1.shift(); 
				} else {
					neg1 = true; 					
					num1.unshift('-');
				}				
				display = num1.join('');
			};
			$show.text(display);
		};
		if ($buttonPressed.hasClass('decimal')){
			if (next) {
				if (isDecimal2 === false) {
					isDecimal2 = true; 
					num2.push('.');
					display = num2.join('');
				};
			} else {
				if (isDecimal1 === false) {
					isDecimal1 = true; 
					num1.push('.');
					display = num1.join('');
				};
			};
			$show.text(display); 
		};		
		if ($buttonPressed.hasClass('percent')){
			var temp; 
			if (next) {				
				temp = doPercent(num2); 
				num2 = temp.toString().split('');				
				display = num2.join('');			
			} else {				
				temp = doPercent(num1); 
				num1 = temp.toString().split('');				
				display = num1.join('');
			};
			$show.text(display); 
		};		
	});
};


var doMath = function(num1, op, num2){
	var num1 = parseFloat(removeComma(num1.toString()));
	var num2 = parseFloat(removeComma(num2.toString()));
	switch (op) {
		case '+':
			return (num1+num2);
		case '-': 
		  	return (num1-num2);  		
		case '*': 		
			return (num1*num2);		   
	    case '/':		  	
	    	var quotient = num1;
	    	quotient /= num2; 
	    	return quotient; 
		default:
			return (num1%num2);    
	}
}; 

var removeComma = function(str){
	return str.replace(/,+/g, '');
};

var pressNum = function(numArr, text){
	numArr.push(text); 
	return numArr.join(''); 		  			
}; 

var doPercent = function(numArr){
	var temp; 
	temp = parseFloat(removeComma(numArr.toString()));
	return (temp /= 100); 
}; 