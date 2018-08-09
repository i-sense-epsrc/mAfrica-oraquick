const {app, BrowserWindow} = require('electron');
const server = require("./ora_quick.js")
const path = require('path')
const url = require('url')

let mainWindow = null;

app.on('ready', () => {
  	mainWindow = new BrowserWindow({
    	height: 435,
    	width: 1200,
    	title: "mAfrica OraQuick",
      titleBarStyle: 'hidden-inset',
    	resizable: true,
    	icon: __dirname + '/assets/img/icon.png',
    	backgroundColor: '#111', 
    	show: false, 
  	});

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
    
    mainWindow.on('ready-to-show', function() { 
      mainWindow.show(); 
      mainWindow.focus(); 
    });

});
