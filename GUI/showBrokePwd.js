const ipcRenderer = require('electron').ipcRenderer;
const { remote } = require('electron');

let current = remote.getCurrentWindow();

console.log(current);

ipcRenderer.on('send-break-data', (event, payload) => {
    console.log("ENTERED");
    //console.log(payload);
    listInfo(payload);
});

function listInfo(itemList) {
	var str = '';
	itemList = itemList.replace(/'/g, '"');
	var infolist = JSON.parse(itemList);
	console.log(infolist);
	document.getElementById("titles").innerText = infolist[0];
	if(infolist[0] == "Se Interrumpió la operación") {
		for (var i = 1; i<infolist.length/3; i++) {
			str += "<div class='card'> <h5 class='card-title'>Password Break Interrumpido:</h5> <ul class='list-group list-group-flush'>";
			str += "<li class='list-group-item'> Ultima combinacion probada: "+infolist[i+1]+"</li>";
			str += "<li class='list-group-item'> Intentos llevados: "+infolist[i]+"</li>";
			str += "<li class='list-group-item'> Tiempo transcurrido: "+infolist[i+2]+"</li>";
			str += "</ul></div>";
		}
	} else {
		for (var i = 1; i<infolist.length/3; i++) {
			str += "<div class='card'> <h5 class='card-title'>Password encontrado:</h5> <ul class='list-group list-group-flush'>";
			str += "<li class='list-group-item'> Password: "+infolist[i+1]+"</li>";
			str += "<li class='list-group-item'> Intentos: "+infolist[i]+"</li>";
			str += "<li class='list-group-item'> Tiempo: "+infolist[i+2]+"</li>";
			str += "</ul></div>";
		}
	}
	
	
	document.getElementById("listInfo").innerHTML = str;
	
} 