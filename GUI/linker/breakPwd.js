const { ipcRenderer } = require('electron');
const { ipcMain } = require('electron');
const { BrowserWindow } = require('electron').remote;

var {PythonShell} = require("python-shell")
var path = require("path")
var passwordBreak
var isCombi = false;
var ctrlDown = false;
const ctrlKey = 17;
const cKey = 67;

window.onload = function() {
	document.body.addEventListener("keydown", function(e) {
		e = e || window.event;
	    var key = e.which || e.keyCode; // keyCode detection
	    var ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false); // ctrl detection

	    if ( key == 67 && ctrl ) {
	    	if (!document.getElementById("stopBreakBtn").disabled){
	    		stop_break_pwd();
	    	}
	    }

	}, false);
}

function disableCheckBox() {
	if(isCombi) {
		var lowerCase = document.getElementById("gridCheck2").checked
		document.getElementById("gridCheck2").checked = false;

		var upperCase = document.getElementById("gridCheck3").checked;
		document.getElementById("gridCheck3").checked = false;

		var digits = document.getElementById("gridCheck4").checked;
		document.getElementById("gridCheck4").checked = false;

		var specialCharacters = document.getElementById("gridCheck5").checked;
		document.getElementById("gridCheck5").checked = false;
		isCombi = false
	}
}

function disableRound() {
	if(!isCombi) {
		document.getElementById("gridRadios1").checked = false;
		document.getElementById("gridRadios2").checked = false;
		document.getElementById("gridRadios3").checked = false;
		document.getElementById("gridRadios4").checked = false;
		document.getElementById("gridRadios5").checked = false;
		document.getElementById("gridRadios6").checked = false;
		isCombi = true;
	}
}

function createBreakPwdWindow(payload) {
  showBreakWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    icon:path.join(__dirname, "../assets/lock_icon.jpg"),
    webPreferences: {
      nodeIntegration: true,
    }
  })

  showBreakWindow.webContents.on('dom-ready', () => {
	showBreakWindow.webContents.send('send-break-data', payload);
	//console.log("Message send to showBreakWindow");
  });

  showBreakWindow.on('closed', function () {
    mainWindow = null
  })

  showBreakWindow.loadFile("showBrokePwd.html")

  //showBreakWindow.webContents.openDevTools()
}

function close_alert() {
	document.getElementById('"alert2"').innerHTML = "";
}

function break_pwd() {
	//console.log("BREAK PWD ENTERED");
	
	var flag = true;
	document.getElementById("stopBreakBtn").disabled = false;

	var pwdLength = document.getElementById("inputPwdLength2").value;
	//document.getElementById("inputPwdLength2").value = "" ;
	
	if (!isCombi) {
		var breakOption = document.querySelector('input[name="gridRadios"]:checked').value;
	} else {
		var breakOption = '';
	}

	var md5Hash = document.getElementById("MD5Hash").value;
	//document.getElementById("MD5Hash").value = "" ;

	var sha1Hash = document.getElementById("SHA1Hash").value;
	//document.getElementById("SHA1Hash").value = "" ;
	
	var lowerCase = document.getElementById("gridCheck2").checked
	//document.getElementById("gridCheck2").checked = false;

	var upperCase = document.getElementById("gridCheck3").checked;
	//document.getElementById("gridCheck3").checked = false;

	var digits = document.getElementById("gridCheck4").checked;
	//document.getElementById("gridCheck4").checked = false;

	var specialCharacters = document.getElementById("gridCheck5").checked;
	//document.getElementById("gridCheck5").checked = false;
	
	var options2 = {
		scriptPath: path.join(__dirname, '/Engine/'),
		args : [pwdLength,isCombi,breakOption,md5Hash,sha1Hash,lowerCase,upperCase,digits,specialCharacters]
	}
	
	if(isCombi && lowerCase == false && upperCase == false && digits == false && specialCharacters == false) {
		document.getElementById("alert2").innerHTML = "<div class='alert alert-warning alert-dismissible fade show' role='alert' id='alertID'> <strong>Alert! </strong> No puede dejar en blanco los hashes, ingrese al menos uno. <button type='button' class='close' data-dismiss='alert' aria-label='Close' onclick='close_alert()'> <span aria-hidden='true'>&times;</span> </button></div>"
		flag = false;
		document.getElementById("gridCheck2").checked = true;
	}

	if (md5Hash == "" && sha1Hash == "") {
		document.getElementById("alert2").innerHTML = "<div class='alert alert-warning alert-dismissible fade show' role='alert' id='alertID'> <strong>Alert! </strong> No puede dejar en blanco los hashes, ingrese al menos uno. <button type='button' class='close' data-dismiss='alert' aria-label='Close' onclick='close_alert()'> <span aria-hidden='true'>&times;</span> </button></div>"
		flag = false;
	}

	if(flag) {
		document.getElementById("breakPass").innerText = "Decifrando...";
	}

	//console.log(options2.args);

	passwordBreak = new PythonShell('break_password.py', options2);
	
	passwordBreak.on('message', function(message) {
		//console.log(message);
		//console.log("Trying to break");
		if (flag && message != "ERROR") {
			//console.log(message);
			document.getElementById("breakPass").innerText = "Comenzar a decifrar"
			createBreakPwdWindow(message);
			passwordBreak.terminate();
			close_alert()
		} else {
			if (flag) {
				document.getElementById("alert2").innerHTML = "<div class='alert alert-warning alert-dismissible fade show' role='alert' id='alertID'> <strong>Holy guacamole!</strong> Se probaron todas las opciones con su selección y no se encontró la contraseña buscada. Intente de nuevo con otros parametros<button type='button' class='close' data-dismiss='alert' aria-label='Close' onclick='close_alert()'> <span aria-hidden='true'>&times;</span> </button></div>"
				document.getElementById("breakPass").innerText = "Comenzar a decifrar";
				document.getElementById("stopBreakBtn").disabled = true;
				passwordBreak.terminate();
			}
			
		}
	})

	//passwordBreak.end(function(err, code, message) {
	//	document.getElementById("breakPass").innerText = "Comenzar a decifrar"
	//})
}

function stop_break_pwd() {
	//console.log("STOP")
	document.getElementById("breakPass").innerText = "Comenzar a decifrar";
	document.getElementById("stopBreakBtn").disabled = true;
	passwordBreak.terminate('SIGINT');
	
}

function reset_Options2() {
	document.getElementById("inputPwdLength2").value = "" ;
	document.getElementById("gridRadios3").checked = true;
	document.getElementById("MD5Hash").value = "" ;
	document.getElementById("SHA1Hash").value = "" ;
}