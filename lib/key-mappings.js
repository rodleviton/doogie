const electron = require('electron')
const app = electron.app
const dialog = electron.dialog
const globalShortcut = electron.globalShortcut

module.exports = {
  register: () => {
    // globalShortcut.register('CommandOrControl+S', function () {
    //   dialog.showMessageBox({
    //     type: 'info',
    //     message: 'Saved!',
    //     detail: 'You pressed the registered global shortcut keybinding.',
    //     buttons: ['OK']
    //   })
    // })
  },
  unregister: () => {
    globalShortcut.unregisterAll()
  }
}
