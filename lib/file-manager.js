const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const dialog = require('electron').dialog
const dataStore = require('./data-store')
const fs = require('fs')

// Event handlers
const fileManager = {
  openFileDialog: (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    const files = dialog.showOpenDialog(window, { properties: [ 'openFile' ]}, function (files) {
      if (files) {
        event.sender.send('selected-directory', files)
      }
    })
  },
  saveFileDialog: (event) => {
    const options = {
      title: 'Save File',
      filters: [
        { name: 'Markdown', extensions: ['md'] }
      ]
    }
    dialog.showSaveDialog(options, (filename) => {
      if (filename) {
        fileManager.saveFile(event, filename)
      }
    })
  },
  saveFile: (event, filename) => {
    const content = dataStore.getContent()

    fs.writeFile(filename, content, (err) => {
      if (err) { console.log(err) }
      event.sender.send('saved-file', filename)
    })
  }
}

module.exports = fileManager
