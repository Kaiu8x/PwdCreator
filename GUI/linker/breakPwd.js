function break_pwd() {
	var python = require("python-shell")
	var path = require("path")
	
	document.getElementById("breakPass").value = "Decifrando..."

	var pwdLength = document.getElementById("inputPwdLength2").value;
	document.getElementById("inputPwdLength2").value = "" ;

	var breakOption = document.querySelector('input[name="gridRadios"]:checked').value;

	var md5Hash = document.getElementById("MD5Hash").value;
	document.getElementById("MD5Hash").value = "" ;

	var sha1Hash = document.getElementById("SHA1Hash").value;
	document.getElementById("SHA1Hash").value = "" ;

	var options = {
		scriptPath: path.join(__dirname, '/../Engine/'),
		args : [[pwdLength,breakOption],[md5Hash,sha1Hash]]
	}

	var passwordBreak = new python('break_password.py', options);
	
	passwordBreak.on('message', function(message) {
		swal(message);
		//create window with answares
	})

	passwordBreak.end(function(err, code, message) {
		document.getElementById("breakPass").value = "Comenzar a decifrar"
	})
}

function reset_Options2() {
	document.getElementById("inputPwdLength2").value = "" ;
	document.getElementById("gridRadios3").checked = true;
	document.getElementById("MD5Hash").value = "" ;
	document.getElementById("SHA1Hash").value = "" ;
}