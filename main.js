const electron = require('electron');
const path = require('path');
const url = require('url');

// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let drawingWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({});
    // Load html in window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes:true
    }));
    // Quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

function createZajecia1(){
    drawingWindow=new BrowserWindow({
        width:900,
        height: 900,
        title: 'Automaty 1D'
    });
    drawingWindow.loadURL(url.format({
        pathname: path.join(__dirname, './Zajecia1/index.html'),
        protocol: 'file',
        slashes: true
    }));
    drawingWindow.on('close', function () {
        drawingWindow=null;
    })
}

function createZajecia2(){
    drawingWindow=new BrowserWindow({
        width:900,
        height: 900,
        title: 'Game of Life'
    });
    drawingWindow.loadURL(url.format({
        pathname: path.join(__dirname, './Zajecia2/index.html'),
        protocol: 'file',
        slashes: true
    }));
    drawingWindow.on('close', function () {
        drawingWindow=null;
    })
}

function createZajecia3(){
    drawingWindow=new BrowserWindow({
        width:900,
        height: 900,
        title: 'Nucleation'
    });
    drawingWindow.loadURL(url.format({
        pathname: path.join(__dirname, './Zajecia3/index.html'),
        protocol: 'file',
        slashes: true
    }));
    drawingWindow.on('close', function () {
        drawingWindow=null;
    })
}

// Create menu template
const mainMenuTemplate =  [
    // Each object is a dropdown
    {
        label: 'File',
        submenu:[
            {
                label:'Zajecia1',
                click(){
                    createZajecia1();
                }
            },
            {
              label: 'Zajecia2',
              click(){
                  createZajecia2();
              }
            },
            {
              label: 'Zajecia3',
              click(){
                  createZajecia3();
              }
            },
            {
                label: 'Quit',
                accelerator:process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

// If OSX, add empty object to menu
if(process.platform === 'darwin'){
    mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                role: 'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator:process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}