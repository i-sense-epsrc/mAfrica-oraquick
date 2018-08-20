const {app, ipcMain ,BrowserWindow} = require('electron');
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
      webPreferences: {
        nativeWindowOpen: true
      }
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

    mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
      event.preventDefault()
      Object.assign(options, {
          backgroundColor: '#111',
      })
      const win = new BrowserWindow(options)
      win.once('ready-to-show', () => win.show())
      event.newGuest = win
    })   

});

// Comment out when pushing to production
app.commandLine.appendSwitch('remote-debugging-port', '8315');
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1');
