// This file is required by the index.html file and will be executed in the
// renderer process for that window. All of the Node.js APIs are available in
// this process.

const electron = require('electron');

const { app, BrowserWindow, ipcRenderer } = electron;

ipcRenderer.on('image', (event, argument) => {
  const div = document.querySelector('#hello');

  div.innerHTML = 'done!';
});


