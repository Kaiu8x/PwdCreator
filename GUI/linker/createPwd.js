const { ipcRenderer } = require('electron');
const { ipcMain } = require('electron');
const { BrowserWindow } = require('electron').remote;
const path = require('path');

function createShowPwdWindow(payload) {
  showPwdWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    icon:path.join(__dirname, '../assets/lock_icon.jpg'),
    webPreferences: {
      nodeIntegration: true,
    }
  })
  
  showPwdWindow.webContents.on('dom-ready', () => {
	showPwdWindow.webContents.send('send-data', payload);
	//console.log("Message send");
  });

  showPwdWindow.on('closed', function () {
    showPwdWindow = null
  })

  showPwdWindow.loadFile('showCreatePwd.html')
  
  //showPwdWindow.webContents.openDevTools()

}

function close_alert() {
	document.getElementById('alertID').hidden = true;
}

function get_pwdOptions() {
	var {PythonShell} = require("python-shell")
	var path = require("path")
	var flag = true;
	var pwdLength = document.getElementById("inputPwdLength").value
	//document.getElementById("inputPwdLength").value = "" ;

	var phonetic = document.getElementById("gridCheck1").checked
	//document.getElementById("gridCheck1").checked = false;
	
	var lowerCase = document.getElementById("gridCheck2").checked
	//document.getElementById("gridCheck2").checked = false;

	var upperCase = document.getElementById("gridCheck3").checked;
	//document.getElementById("gridCheck3").checked = false;

	var digits = document.getElementById("gridCheck4").checked;
	//document.getElementById("gridCheck4").checked = false;

	var specialCharacters = document.getElementById("gridCheck5").checked;
	//document.getElementById("gridCheck5").checked = false;

	var noRepetition = document.getElementById("gridCheck6").checked;
	//document.getElementById("gridCheck6").checked = false;

	var numPwd = document.getElementById("numPwd").value;
	//document.getElementById("numPwd").value = "" ;

	if (pwdLength == "" || numPwd == "") {
		document.getElementById("alert").innerHTML = "<div class='alert alert-warning alert-dismissible fade show' role='alert' id='alertID'> <strong>Alert! </strong> No puede dejar en blanco la longitud y el numero de contraseñas. <button type='button' class='close' data-dismiss='alert' aria-label='Close' onclick='close_alert()'> <span aria-hidden='true'>&times;</span> </button></div>"
		flag = false;
	}

	if(lowerCase == false && upperCase == false && digits == false && specialCharacters == false) {
		document.getElementById("alert").innerHTML = "<div class='alert alert-warning alert-dismissible fade show' role='alert' id='alertID'> <strong>Alert! </strong> Tiene que seleccionar una de las opciones para crear contraseña <button type='button' class='close' data-dismiss='alert' aria-label='Close' onclick='close_alert()'> <span aria-hidden='true'>&times;</span> </button></div>"	
		flag = false;
	}

	var options = {
		scriptPath: path.join(__dirname, '/Engine/'),
		args : [pwdLength,phonetic,lowerCase,upperCase,digits,specialCharacters,noRepetition, numPwd]
	}
	
	//console.log(options.args);
	

	var passwords = new PythonShell('password1.py', options);

	passwords.on('message', function(message) {
		//console.log(message)
		if (flag && message != "No es possible generar la contrasena") {
			createShowPwdWindow(message)
			passwords.terminate()
		} else {
			document.getElementById("alert").innerHTML = "<div class='alert alert-warning alert-dismissible fade show' role='alert' id='alertID'> <strong>Holy guacamole!</strong> No se pudo crear las contraseñas con estas restricciones. Esocoge otras <button type='button' class='close' data-dismiss='alert' aria-label='Close' onclick='close_alert()'> <span aria-hidden='true'>&times;</span> </button></div>"
			passwords.terminate()
		}
		//swal(message);
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