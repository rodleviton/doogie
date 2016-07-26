const ipc = require('electron').ipcMain
const fileManager = require('./file-manager')
const dataStore = require('./data-store')

// File manager
ipc.on('open-file-dialog-sheet', function (event) {
  fileManager.openFileDialog(event)
})

ipc.on('save-dialog', function (event) {
  fileManager.saveFileDialog(event)
})

ipc.on('save-file', function (event) {
  fileManager.saveFile(event)
})

// Data
ipc.on('update-content', function (event, content) {
  dataStore.setContent(event, content)
})
