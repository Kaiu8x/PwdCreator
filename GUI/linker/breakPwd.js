const { ipcRenderer } = require('electron');
const { ipcMain } = require('electron');
const { BrowserWindow } = require('electron').remote;

var {PythonShell} = require("python-shell")
var path = require("path")
var passwordBreak

function createBreakPwdWindow(payload) {
  showBreakWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    icon:path.join(__dirname, '../assets/lock_icon.jpg'),
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

  showBreakWindow.loadFile('showBrokePwd.html')

  //showBreakWindow.webContents.openDevTools()
}

function close_alert() {
	document.getElementById('alertID').hidden = true;
}

function break_pwd() {
	//console.log("BREAK PWD ENTERED");
	
	var flag = true;
	document.getElementById("stopBreakBtn").disabled = false;

	var pwdLength = document.getElementById("inputPwdLength2").value;
	//document.getElementById("inputPwdLength2").value = "" ;

	var breakOption = document.querySelector('input[name="gridRadios"]:checked').value;

	var md5Hash = document.getElementById("MD5Hash").value;
	//document.getElementById("MD5Hash").value = "" ;

	var sha1Hash = document.getElementById("SHA1Hash").value;
	//document.getElementById("SHA1Hash").value = "" ;

	var options2 = {
		scriptPath: path.join(__dirname, '/Engine/'),
		args : [pwdLength,breakOption,md5Hash,sha1Hash]
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
			document.getElementById("breakPass").innerText = "Decifrar"
			createBreakPwdWindow(message);
			passwordBreak.terminate();
		} else {
			if (flag) {
				document.getElementById("alert2").innerHTML = "<div class='alert alert-warning alert-dismissible fade show' role='alert' id='alertID'> <strong>Holy guacamole!</strong> Se probaron todas las opciones con su selección y no se encontró la contraseña buscada. Intente de nuevo con otros parametros<button type='button' class='close' data-dismiss='alert' aria-label='Close' onclick='close_alert()'> <span aria-hidden='true'>&times;</span> </button></div>"
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
	passwordBreak.terminate('SIGINT');
}

function reset_Options2() {
	document.getElementById("inputPwdLength2").value = "" ;
	document.getElementById("gridRadios3").checked = true;
	document.getElementById("MD5Hash").value = "" ;
	document.getElementById("SHA1Hash").value = "" ;
}