const { webContents } = require('electron');
const { BrowserWindow } = require('electron');
const { ipcRenderer } = require('electron').ipcRenderer;

ipcRenderer.on('send-data', (event, payload) => {
    console.log("ENTERED");
    console.log(payload);
});

ipcRenderer.on('send-hello', (event, msg) => {
    console.log(msg);
});