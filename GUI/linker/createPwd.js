function get_pwdOptions() {
	var python = require("python-shell")
	var path = require("path")

	var pwdLength = document.getElementById("inputPwdLength").value;
	document.getElementById("inputPwdLength").value = "" ;

	var phonetic = document.getElementById("gridCheck1").checked;
	document.getElementById("gridCheck1").checked = false;
	
	var lowerCase = document.getElementById("gridCheck2").checked;
	document.getElementById("gridCheck2").checked = false;

	var upperCase = document.getElementById("gridCheck3").checked;
	document.getElementById("gridCheck3").checked = false;

	var digits = document.getElementById("gridCheck4").checked;
	document.getElementById("gridCheck4").checked = false;

	var specialCharacters = document.getElementById("gridCheck5").checked;
	document.getElementById("gridCheck5").checked = false;

	var noRepetition = document.getElementById("gridCheck6").checked;
	document.getElementById("gridCheck6").checked = false;

	var numPwd = document.getElementById("numPwd").value;
	document.getElementById("numPwd").value = "" ;

	var options = {
		scriptPath: path.join(__dirname, '/../Engine/'),
		args : [pwdLength,phonetic,lowerCase,upperCase,digits,specialCharacters,noRepetition, numPwd]
	}

	var passwords = new python('password1.py', options);

	passwords.on('message', function(message) {
		swal(message);
		//create window with answares
	})
}

function reset_Options() {
	document.getElementById("inputPwdLength").value = "" ;
	document.getElementById("gridCheck1").checked = false;
	document.getElementById("gridCheck2").checked = false;
	document.getElementById("gridCheck3").checked = false;
	document.getElementById("gridCheck4").checked = false;
	document.getElementById("gridCheck5").checked = false;
	document.getElementById("gridCheck6").checked = false;
	document.getElementById("numPwd").value = "" ;
}