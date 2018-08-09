const {app, BrowserWindow} = require('electron');
const server = require("./ora_quick.js")
const path = require('path')
const url = require('url')

let mainWindow = null;

app.on('ready', () => {
  	mainWindow = new BrowserWindow({
    	height: 435,  // Mac Height
    	width: 1200,  // Mac Width
      //height: 500,  // Win Height
      //width: 1220,  // Win Width
    	title: "mAfrica OraQuick",
      titleBarStyle: 'hidden-inset',
    	resizable: true,
      //icon: path.join(__dirname, 'assets/img/icon.png'),
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

    mainWindow.on('closed', function() { 
      mainWindow = null; 
      app.quit(); 
    });

});
