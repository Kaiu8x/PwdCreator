const ipcRenderer = require('electron').ipcRenderer;
const { remote } = require('electron');

let current = remote.getCurrentWindow();

console.log(current);

ipcRenderer.on('send-data', (event, payload) => {
    console.log("ENTERED");
    //console.log(payload);
    listItems(payload);
});

function convert2Array(arr) {
	return Array.prototype.slice.call(arr);
}

function listItems(itemList) {
	var str = '';
	itemList = itemList.replace(/'/g, '"');
	var pwdlist = JSON.parse(itemList);
	console.log(pwdlist);
	var length = pwdlist.length;
	for (var i = 0; i<length; i+=3) {
		str += "<div class='card'> <h5 class='card-title'>Password "+((i/3)+1) +":</h5> <ul class='list-group list-group-flush'>";
		str += "<li class='list-group-item'> Password: "+pwdlist[i]+"</li>";
		str += "<li class='list-group-item'> MD5: "+pwdlist[i+1]+"</li>";
		str += "<li class='list-group-item'> SHA-1: "+pwdlist[i+2]+"</li>";
		str += "</ul></div>";
	}
	
	document.getElementById("listPwd").innerHTML = str;
} 